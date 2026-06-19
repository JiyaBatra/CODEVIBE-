const LanguageConfig = {
  c: {
    image: "gcc:latest",
    compileCmd: (src, out) => ["gcc", src, "-o", out],
    runCmd: (out) => [`./${out}`],
    extension: ".c",
  },
  cpp: {
    image: "gcc:latest",
    compileCmd: (src, out) => ["g++", src, "-o", out],
    runCmd: (out) => [`./${out}`],
    extension: ".cpp",
  },
  python: {
    image: "python:3.12-alpine",
    compileCmd: null,
    runCmd: (src) => ["python3", src],
    extension: ".py",
  },
  java: {
    image: "openjdk:17-alpine",
    compileCmd: (src) => ["javac", src],
    runCmd: (className) => ["java", className],
    extension: ".java",
  },
  node: {
    image: "node:20-alpine",
    compileCmd: null,
    runCmd: (src) => ["node", src],
    extension: ".js",
  },
  javascript: {
    image: "node:20-alpine",
    compileCmd: null,
    runCmd: (src) => ["node", src],
    extension: ".js",
  },
  dbms: {
    image: null,
    compileCmd: null,
    runCmd: () => ["echo", "✅ Simulated DB/MS execution: Query parsed successfully."],
    extension: ".sql",
  },
  mongo: {
    image: null,
    compileCmd: null,
    runCmd: () => ["echo", "✅ Simulated DB/MS execution: Query parsed successfully."],
    extension: ".js",
  }
};

module.exports = LanguageConfig;
