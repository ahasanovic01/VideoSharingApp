const { hashPassword, comparePassword } = require('../../utils/helpers');

describe('Password Hashing Utilities', () => {
    const plainPassword = 'TestPassword123!';

    test('hashPassword should hash a password correctly', async () => {
        const hashedPassword = await hashPassword(plainPassword);
        expect(hashedPassword).not.toBe(plainPassword);
        expect(hashedPassword).toHaveLength(60); 
    });

    test('comparePassword should correctly compare a plain password to its hash', async () => {
        const hashedPassword = await hashPassword(plainPassword);
        const isMatch = await comparePassword(plainPassword, hashedPassword);
        expect(isMatch).toBeTruthy();
    });
});
