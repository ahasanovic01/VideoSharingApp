const request = require('supertest');
const app = require('../../server'); // Path to your Express app
const User = require('../../models/User');

describe('Authentication Routes', () => {
    // Optionally, you could insert a dummy user into your database before running these tests
    beforeAll(async () => {
        await User.create({ email: 'test@example.com', password: 'Password123!' });
    });

    // Clean up the dummy user after tests
    afterAll(async () => {
        await User.deleteMany({});
    });

    test('POST /register should register a new user', async () => {
        const userData = {
            email: 'newuser@example.com',
            password: 'NewPassword123!'
        };

        const response = await request(app)
            .post('/register')
            .send(userData);

        expect(response.statusCode).toEqual(200); // or whatever your logic dictates
        // Additional assertions...
    });

    test('POST /login should authenticate a user', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'Password123!'
        };

        const response = await request(app)
            .post('/login')
            .send(userData);

        expect(response.statusCode).toEqual(200); // Adjust based on your app's logic
        // Additional assertions...
    });

    // More tests as needed...
});
