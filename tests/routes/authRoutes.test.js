const request = require('supertest');
const app = require('../../server'); 
const User = require('../../models/User');

describe('Authentication Routes', () => {
    beforeAll(async () => {
        await User.create({ email: 'test@example.com', password: 'Password123!' });
    });

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

        expect(response.statusCode).toEqual(200); 
    });

    test('POST /login should authenticate a user', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'Password123!'
        };

        const response = await request(app)
            .post('/login')
            .send(userData);

        expect(response.statusCode).toEqual(200); 
    });

});
