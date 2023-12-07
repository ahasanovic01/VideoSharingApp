const mongoose = require('mongoose');
const User = require('../../models/User');

// Assuming you have a function to connect to a test database
const { connectToTestDb, closeTestDb } = require('../setupTestDb');

beforeAll(async () => {
    await connectToTestDb();
});

afterAll(async () => {
    await closeTestDb();
});

describe('User Model Test', () => {
    it('create & save user successfully', async () => {
        const userData = { email: 'test@example.com', password: 'Test@123' };
        const validUser = new User(userData);
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        // More assertions...
    });

    // Other tests like validation failures, password hashing, etc.
});
