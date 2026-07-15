const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const mongoose = require('mongoose');
const connectDB = require('../src/db/db');
const app = require('../src/app');
const User = require('../src/models/User');

test('register route responds successfully', async () => {
  const originalCreate = User.create;
  User.create = async () => {
    throw new Error('Operation `users.insertOne()` buffering timed out after 10000ms');
  };

  const server = app.listen(0);

  try {
    const { port } = server.address();
    const payload = JSON.stringify({
      name: 'Route Test',
      email: 'route@example.com',
      password: '123456'
    });

    const response = await new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: '127.0.0.1',
          port,
          path: '/api/users/register',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
          }
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
        }
      );

      req.on('error', reject);
      req.write(payload);
      req.end();
    });

    assert.equal(response.statusCode, 201);
    const body = JSON.parse(response.body);
    assert.equal(body.success, true);
    assert.ok(body.token);
    assert.equal(body.warning, 'Database unavailable; user stored in memory for this session');
  } finally {
    User.create = originalCreate;
    await new Promise((resolve) => server.close(resolve));
  }
});

test('connectDB uses MONGO_URI when MONGODB_URI is not set', async () => {
  const originalMongoUri = process.env.MONGO_URI;
  const originalMongodUri = process.env.MONGODB_URI;
  const originalConnect = mongoose.connect;
  const originalExit = process.exit;
  const originalLog = console.log;
  const originalError = console.error;

  process.env.MONGO_URI = 'mongodb://localhost:27017/test-db';
  delete process.env.MONGODB_URI;

  let calledUrl;
  mongoose.connect = async (uri) => {
    calledUrl = uri;
    return { connection: { host: 'localhost' } };
  };

  process.exit = () => {
    throw new Error('process.exit was called');
  };

  console.log = () => {};
  console.error = () => {};

  try {
    await connectDB();
    assert.equal(calledUrl, process.env.MONGO_URI);
  } finally {
    mongoose.connect = originalConnect;
    process.exit = originalExit;
    console.log = originalLog;
    console.error = originalError;

    if (originalMongoUri === undefined) {
      delete process.env.MONGO_URI;
    } else {
      process.env.MONGO_URI = originalMongoUri;
    }

    if (originalMongodUri === undefined) {
      delete process.env.MONGODB_URI;
    } else {
      process.env.MONGODB_URI = originalMongodUri;
    }
  }
});
