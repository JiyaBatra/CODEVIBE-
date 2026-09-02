// server/utils/mongoSimulator.js

// ============================================================
// IN-MEMORY DATABASE - Fresh copy created for each execution
// ============================================================
const getInitialDB = () => ({
  mydb: {
    users: [
      { _id: "id1", name: "Alice", age: 20 },
      { _id: "id2", name: "Bob",   age: 25 },
      { _id: "id3", name: "Carol", age: 30 },
    ],
  },
});

// ============================================================
// HELPERS
// ============================================================
const genId = () => Math.random().toString(16).slice(2, 14);

// Match a document against a MongoDB filter
const matchesFilter = (doc, filter = {}) => {
  if (!filter || Object.keys(filter).length === 0) return true;
  return Object.entries(filter).every(([key, val]) => {
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      if ("$gt"  in val) return doc[key] >  val.$gt;
      if ("$gte" in val) return doc[key] >= val.$gte;
      if ("$lt"  in val) return doc[key] <  val.$lt;
      if ("$lte" in val) return doc[key] <= val.$lte;
      if ("$ne"  in val) return doc[key] !== val.$ne;
      if ("$in"  in val) return val.$in.includes(doc[key]);
      if ("$nin" in val) return !val.$nin.includes(doc[key]);
    }
    return doc[key] === val;
  });
};

// Apply $set / $inc / $unset / $push to a document
const applyUpdate = (doc, update) => {
  if (update.$set)   Object.assign(doc, update.$set);
  if (update.$unset) Object.keys(update.$unset).forEach((k) => delete doc[k]);
  if (update.$inc)   Object.entries(update.$inc).forEach(([k, v]) => {
    doc[k] = (doc[k] || 0) + v;
  });
  if (update.$push)  Object.entries(update.$push).forEach(([k, v]) => {
    if (!Array.isArray(doc[k])) doc[k] = [];
    doc[k].push(v);
  });
  return doc;
};

// Run aggregation pipeline on an array of documents
const runPipeline = (docs, pipeline) => {
  let result = [...docs];

  for (const stage of pipeline) {
    // $match
    if (stage.$match) {
      result = result.filter((d) => matchesFilter(d, stage.$match));
    }

    // $group
    else if (stage.$group) {
      const groups = {};
      result.forEach((doc) => {
        const idExpr = stage.$group._id;
        const key =
          typeof idExpr === "string" && idExpr.startsWith("$")
            ? doc[idExpr.slice(1)]
            : idExpr;
        const keyStr = JSON.stringify(key);
        if (!groups[keyStr]) groups[keyStr] = { _id: key };

        Object.entries(stage.$group).forEach(([field, expr]) => {
          if (field === "_id") return;

          if (expr.$sum !== undefined) {
            const v =
              typeof expr.$sum === "string" && expr.$sum.startsWith("$")
                ? doc[expr.$sum.slice(1)]
                : expr.$sum;
            groups[keyStr][field] = (groups[keyStr][field] || 0) + (v || 0);
          }

          if (expr.$avg !== undefined) {
            const v =
              typeof expr.$avg === "string" && expr.$avg.startsWith("$")
                ? doc[expr.$avg.slice(1)]
                : 0;
            const meta = `__${field}`;
            if (!groups[keyStr][meta]) groups[keyStr][meta] = { sum: 0, cnt: 0 };
            groups[keyStr][meta].sum += v;
            groups[keyStr][meta].cnt += 1;
            groups[keyStr][field] =
              groups[keyStr][meta].sum / groups[keyStr][meta].cnt;
          }

          if (expr.$max !== undefined) {
            const v =
              typeof expr.$max === "string" && expr.$max.startsWith("$")
                ? doc[expr.$max.slice(1)]
                : expr.$max;
            groups[keyStr][field] =
              groups[keyStr][field] === undefined
                ? v
                : Math.max(groups[keyStr][field], v);
          }

          if (expr.$min !== undefined) {
            const v =
              typeof expr.$min === "string" && expr.$min.startsWith("$")
                ? doc[expr.$min.slice(1)]
                : expr.$min;
            groups[keyStr][field] =
              groups[keyStr][field] === undefined
                ? v
                : Math.min(groups[keyStr][field], v);
          }

          if (expr.$push !== undefined) {
            const v =
              typeof expr.$push === "string" && expr.$push.startsWith("$")
                ? doc[expr.$push.slice(1)]
                : expr.$push;
            if (!Array.isArray(groups[keyStr][field]))
              groups[keyStr][field] = [];
            groups[keyStr][field].push(v);
          }
        });
      });

      // Strip internal tracking keys (start with __)
      result = Object.values(groups).map((g) => {
        const clean = {};
        Object.keys(g).forEach((k) => {
          if (!k.startsWith("__")) clean[k] = g[k];
        });
        return clean;
      });
    }

    // $sort
    else if (stage.$sort) {
      const [sortKey, sortOrder] = Object.entries(stage.$sort)[0];
      result.sort((a, b) =>
        sortOrder === 1
          ? a[sortKey] > b[sortKey] ? 1 : -1
          : a[sortKey] < b[sortKey] ? 1 : -1
      );
    }

    // $limit
    else if (stage.$limit) {
      result = result.slice(0, stage.$limit);
    }

    // $skip
    else if (stage.$skip) {
      result = result.slice(stage.$skip);
    }

    // $project
    else if (stage.$project) {
      result = result.map((doc) => {
        const out = {};
        Object.entries(stage.$project).forEach(([k, v]) => {
          if (v === 1 || v === true) out[k] = doc[k];
        });
        return out;
      });
    }
  }

  return result;
};

// ============================================================
// MOCK COLLECTION FACTORY
// ============================================================
const makeCollection = (colArray) => ({
  // find - returns cursor-like object
  find: (filter = {}) => ({
    toArray: async () => colArray.filter((d) => matchesFilter(d, filter)),
    sort:    () => ({ toArray: async () => colArray.filter((d) => matchesFilter(d, filter)) }),
    limit:   () => ({ toArray: async () => colArray.filter((d) => matchesFilter(d, filter)) }),
  }),

  // findOne
  findOne: async (filter = {}) =>
    colArray.find((d) => matchesFilter(d, filter)) || null,

  // insertOne
  insertOne: async (doc) => {
    const newDoc = { _id: genId(), ...doc };
    colArray.push(newDoc);
    return { acknowledged: true, insertedId: newDoc._id };
  },

  // insertMany
  insertMany: async (docs) => {
    if (!Array.isArray(docs)) throw new Error("insertMany requires an array");
    const inserted = docs.map((d) => ({ _id: genId(), ...d }));
    inserted.forEach((d) => colArray.push(d));
    return {
      acknowledged:  true,
      insertedCount: inserted.length,
      insertedIds:   inserted.map((d) => d._id),
    };
  },

  // updateOne
  updateOne: async (filter, update) => {
    const idx = colArray.findIndex((d) => matchesFilter(d, filter));
    if (idx !== -1) {
      applyUpdate(colArray[idx], update);
      return { acknowledged: true, matchedCount: 1, modifiedCount: 1 };
    }
    return { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
  },

  // updateMany
  updateMany: async (filter, update) => {
    let count = 0;
    colArray.forEach((doc, i) => {
      if (matchesFilter(doc, filter)) {
        applyUpdate(colArray[i], update);
        count++;
      }
    });
    return { acknowledged: true, matchedCount: count, modifiedCount: count };
  },

  // replaceOne
  replaceOne: async (filter, replacement) => {
    const idx = colArray.findIndex((d) => matchesFilter(d, filter));
    if (idx !== -1) {
      const id = colArray[idx]._id;
      colArray[idx] = { _id: id, ...replacement };
      return { acknowledged: true, matchedCount: 1, modifiedCount: 1 };
    }
    return { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
  },

  // deleteOne
  deleteOne: async (filter) => {
    const idx = colArray.findIndex((d) => matchesFilter(d, filter));
    if (idx !== -1) {
      colArray.splice(idx, 1);
      return { acknowledged: true, deletedCount: 1 };
    }
    return { acknowledged: true, deletedCount: 0 };
  },

  // deleteMany
  deleteMany: async (filter) => {
    const before = colArray.length;
    const keep   = colArray.filter((d) => !matchesFilter(d, filter));
    colArray.length = 0;
    keep.forEach((d) => colArray.push(d));
    return { acknowledged: true, deletedCount: before - keep.length };
  },

  // countDocuments
  countDocuments: async (filter = {}) =>
    colArray.filter((d) => matchesFilter(d, filter)).length,

  // aggregate
  aggregate: (pipeline) => ({
    toArray: async () => runPipeline(colArray, pipeline),
  }),

  // drop
  drop: async () => {
    colArray.length = 0;
    return true;
  },

  // createIndex (no-op in simulator)
  createIndex: async () => ({ ok: 1 }),
});

// ============================================================
// MOCK DB FACTORY
// ============================================================
const makeDb = (dbObj) => ({
  collection: (colName) => {
    if (!dbObj[colName]) dbObj[colName] = [];
    return makeCollection(dbObj[colName]);
  },
  // listCollections (simplified)
  listCollections: () => ({
    toArray: async () => Object.keys(dbObj).map((name) => ({ name })),
  }),
});

// ============================================================
// MOCK MongoClient
// ============================================================
const makeMockMongoClient = (storage) => {
  return class MockMongoClient {
    constructor(uri) { this.uri = uri; }
    async connect()  { /* no-op */ }
    async close()    { /* no-op */ }

    db(dbName) {
      if (!storage[dbName]) storage[dbName] = {};
      return makeDb(storage[dbName]);
    }
  };
};

// ============================================================
// MOCK EXPRESS
// ============================================================
const makeMockExpress = (logs) => {
  const express = () => {
    const app = {
      _routes: {},
      get:    (path, ...handlers) => {
        app._routes[`GET:${path}`] = handlers[handlers.length - 1];
      },
      post:   (path, ...handlers) => {
        app._routes[`POST:${path}`] = handlers[handlers.length - 1];
      },
      put:    (path, ...handlers) => {
        app._routes[`PUT:${path}`] = handlers[handlers.length - 1];
      },
      delete: (path, ...handlers) => {
        app._routes[`DELETE:${path}`] = handlers[handlers.length - 1];
      },
      patch:  (path, ...handlers) => {
        app._routes[`PATCH:${path}`] = handlers[handlers.length - 1];
      },
      use:    () => {},
      listen: (port, cb) => {
        if (typeof cb === "function") cb();
        return { close: () => {} };
      },
    };
    return app;
  };

  // Express middleware stubs
  express.json       = () => (req, res, next) => next && next();
  express.urlencoded = () => (req, res, next) => next && next();
  express.static     = () => (req, res, next) => next && next();
  express.Router     = () => ({
    get:    () => {},
    post:   () => {},
    put:    () => {},
    delete: () => {},
    use:    () => {},
  });

  return express;
};

// ============================================================
// DETECT if code uses MongoDB / Express patterns
// ============================================================
const isMongoCode = (code) => {
  const patterns = [
    "MongoClient",
    "mongodb",
    "db.collection",
    "insertOne",
    "insertMany",
    "find(",
    "findOne",
    "updateOne",
    "updateMany",
    "deleteOne",
    "deleteMany",
    "aggregate(",
    "client.connect",
    "client.db(",
  ];
  return patterns.some((p) => code.includes(p));
};

// ============================================================
// MAIN SIMULATOR - runs Node.js MongoDB code safely
// ============================================================
const runMongoSimulation = async (code) => {
  const logs    = [];
  const storage = getInitialDB(); // Fresh DB per run

  // Capture console output
  const logger = {
    log:   (...args) => logs.push(args.map(formatArg).join(" ")),
    error: (...args) => logs.push(args.map(formatArg).join(" ")),
    warn:  (...args) => logs.push(args.map(formatArg).join(" ")),
    dir:   (...args) => logs.push(args.map(formatArg).join(" ")),
    info:  (...args) => logs.push(args.map(formatArg).join(" ")),
  };

  const formatArg = (a) => {
    if (a === null)      return "null";
    if (a === undefined) return "undefined";
    if (typeof a === "object") return JSON.stringify(a, null, 2);
    return String(a);
  };

  // Build mock modules
  const MockMongoClient = makeMockMongoClient(storage);
  const mockExpress     = makeMockExpress(logs);

  // require() interceptor - ONLY intercepts mongodb & express
  const mockRequire = (mod) => {
    if (mod === "mongodb")  return { MongoClient: MockMongoClient };
    if (mod === "express")  return mockExpress;
    if (mod === "path")     return require("path");
    if (mod === "util")     return require("util");
    // Block any other native modules for safety
    throw new Error(
      `Module '${mod}' is not available in the MongoDB simulator.`
    );
  };

  // Wrap the user's code so it runs in an async context
  const wrappedCode = `
    (async () => {
      try {
        ${code}
      } catch (e) {
        console.error('Runtime Error: ' + (e.message || String(e)));
      }
    })()
  `;

  try {
    // Use Function constructor (safer than eval, no access to real require)
    const runner = new Function(
      "require",
      "console",
      "setTimeout",
      "clearTimeout",
      "Promise",
      "process",
      wrappedCode
    );

    const result = runner(
      mockRequire,
      logger,
      setTimeout,
      clearTimeout,
      Promise,
      { env: {}, exit: () => {}, argv: [] }
    );

    // Wait for async code to settle
    if (result && typeof result.then === "function") {
      await Promise.race([
        result,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Execution timed out")), 7000)
        ),
      ]);
    }

    // Give any remaining micro-tasks time to finish
    await new Promise((r) => setTimeout(r, 300));

  } catch (e) {
    logs.push(`Error: ${e.message}`);
  }

  return logs.join("\n");
};

module.exports = { runMongoSimulation, isMongoCode };