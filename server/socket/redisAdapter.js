/**
 * @module socket/redisAdapter
 * Configures the Socket.io Redis adapter for multi-instance communication.
 * Falls back to local (in-memory) mode when Redis is unavailable.
 */

const { createAdapter } = require("@socket.io/redis-adapter");
const { Redis } = require("ioredis");

/** @type {Redis|null} */
let pubClient = null;
/** @type {Redis|null} */
let subClient = null;
let redisAvailable = false;

/**
 * Builds an ioredis options object from environment variables.
 * @returns {{ host: string, port: number } | string}
 */
const getRedisConfig = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  return {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    retryStrategy: (times) => Math.min(times * 200, 5000),
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  };
};

/**
 * Attempts to connect Redis pub/sub clients and attach the adapter to the
 * given Socket.io server.  If Redis is unreachable the server continues
 * in local-only mode (single instance, no cross-node broadcasting).
 *
 * @param {import("socket.io").Server} io
 * @returns {Promise<boolean>} `true` if Redis adapter was attached.
 */
const setupRedisAdapter = async (io) => {
  const config = getRedisConfig();

  try {
    pubClient = new Redis(config);
    subClient = pubClient.duplicate();

    // Attempt actual connection
    await Promise.all([pubClient.connect(), subClient.connect()]);

    io.adapter(createAdapter(pubClient, subClient));
    redisAvailable = true;

    pubClient.on("error", (err) => {
      console.error("[Redis Adapter] Publisher error:", err.message);
    });
    subClient.on("error", (err) => {
      console.error("[Redis Adapter] Subscriber error:", err.message);
    });

    console.log("✅ Socket.io Redis adapter connected");
    return true;
  } catch (err) {
    console.warn(
      `⚠️ Redis unavailable (${err.message}). Running in local socket mode.`
    );
    // Clean up partial connections
    try { pubClient?.disconnect(); } catch (_e) { /* ignore */ }
    try { subClient?.disconnect(); } catch (_e) { /* ignore */ }
    pubClient = null;
    subClient = null;
    redisAvailable = false;
    return false;
  }
};

/**
 * @returns {boolean} Whether Redis adapter is currently active.
 */
const isRedisAvailable = () => redisAvailable;

/**
 * Gracefully disconnect Redis clients.
 */
const shutdownRedis = async () => {
  try { await pubClient?.quit(); } catch (_e) { /* ignore */ }
  try { await subClient?.quit(); } catch (_e) { /* ignore */ }
};

module.exports = { setupRedisAdapter, isRedisAvailable, shutdownRedis };
