import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
    return await hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
}