const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

const denylist = new Map();

function addToDenylist(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const expiryMs = decoded.exp * 1000;
    const ttlMs = expiryMs - Date.now();
    if (ttlMs > 0) {
      denylist.set(token, expiryMs);
      setTimeout(() => denylist.delete(token), ttlMs);
    }
  } catch {
    // already invalid, no need to store
  }
}

function isDenylisted(token) {
  return denylist.has(token);
}

module.exports = { addToDenylist, isDenylisted };