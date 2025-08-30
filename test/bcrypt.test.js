const assert = require('assert');
const { generateHash, verifyHash } = require('../bcrypt-gen');

(async () => {
  try {
    // Test 1: generateHash returns a bcrypt hash with default rounds (10)
    const password = 'S3cret-P@ssw0rd';
    const hash10 = await generateHash(password);
    assert.strictEqual(typeof hash10, 'string', 'Hash should be a string');
    assert.ok(hash10.startsWith('$2b$10$') || hash10.startsWith('$2a$10$') || hash10.startsWith('$2y$10$'), 'Hash should start with $2b$10$ (or $2a$/$2y$)');

    // Test 2: verifyHash returns true for correct password
    const match = await verifyHash(hash10, password);
    assert.strictEqual(match, true, 'verifyHash should return true for matching password');

    // Test 3: verifyHash returns false for incorrect password
    const mismatch = await verifyHash(hash10, 'wrong-password');
    assert.strictEqual(mismatch, false, 'verifyHash should return false for non-matching password');

    // Test 4: generateHash with custom rounds (12) encodes rounds in prefix
    const hash12 = await generateHash(password, 12);
    assert.strictEqual(typeof hash12, 'string', 'Custom rounds hash should be a string');
    assert.ok(hash12.startsWith('$2b$12$') || hash12.startsWith('$2a$12$') || hash12.startsWith('$2y$12$'), 'Hash should start with $2b$12$ (or $2a$/$2y$) for 12 rounds');

    // Test 5: verifyHash returns false for invalid hash format
    const invalidHashResult = await verifyHash('not-a-bcrypt-hash', password);
    assert.strictEqual(invalidHashResult, false, 'verifyHash should return false for invalid hash format');

    // Test 6: generateHash handles invalid salt rounds by returning undefined
    const invalidRoundsHash = await generateHash(password, 'abc');
    assert.strictEqual(invalidRoundsHash, undefined, 'generateHash should return undefined when salt rounds is invalid');

    console.log('All bcrypt unit tests passed.');
    process.exit(0);
  } catch (err) {
    console.error('A bcrypt unit test failed:', err.message || err);
    process.exit(1);
  }
})();
