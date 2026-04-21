const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const STORE_PATH = path.join(DATA_DIR, 'subscriptions.json');

function normalizeEmail(email) {
  if (!email || typeof email !== 'string') {
    return '';
  }
  return email.trim().toLowerCase();
}

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify({ users: {}, payments: [] }, null, 2));
  }
}

function readStore() {
  ensureStore();

  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      users: parsed.users || {},
      payments: parsed.payments || [],
    };
  } catch (error) {
    return { users: {}, payments: [] };
  }
}

function writeStore(data) {
  ensureStore();
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2));
}

function grantSubscription(userInfo, universityId, paymentInfo = {}) {
  if (!userInfo || !userInfo.id || !universityId) {
    return;
  }

  const userId = String(userInfo.id);
  const email = normalizeEmail(userInfo.email);
  const db = readStore();

  if (!db.users[userId]) {
    db.users[userId] = {
      email,
      subscriptions: {},
    };
  }

  db.users[userId].email = email || db.users[userId].email || '';
  db.users[userId].subscriptions[universityId] = {
    active: true,
    amountUsd: 1,
    grantedAt: new Date().toISOString(),
    ...paymentInfo,
  };

  db.payments.unshift({
    userId,
    email: db.users[userId].email,
    universityId,
    amountUsd: 1,
    paidAt: new Date().toISOString(),
    ...paymentInfo,
  });

  if (db.payments.length > 5000) {
    db.payments = db.payments.slice(0, 5000);
  }

  writeStore(db);
}

function hasSubscription(userId, universityId) {
  if (!userId || !universityId) {
    return false;
  }
  const db = readStore();
  return Boolean(db.users?.[String(userId)]?.subscriptions?.[universityId]?.active);
}

function listPayments(limit = 500) {
  const db = readStore();
  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 5000) : 500;
  return db.payments.slice(0, safeLimit);
}

function listActiveSubscriptions() {
  const db = readStore();
  const rows = [];

  for (const [userId, userData] of Object.entries(db.users)) {
    const subscriptions = userData.subscriptions || {};
    for (const [universityId, subData] of Object.entries(subscriptions)) {
      if (subData && subData.active) {
        rows.push({
          userId,
          email: userData.email || '',
          universityId,
          ...subData,
        });
      }
    }
  }

  rows.sort((a, b) => {
    const aTime = new Date(a.grantedAt || 0).getTime();
    const bTime = new Date(b.grantedAt || 0).getTime();
    return bTime - aTime;
  });

  return rows;
}

module.exports = {
  grantSubscription,
  hasSubscription,
  listPayments,
  listActiveSubscriptions,
};
