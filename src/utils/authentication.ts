import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';  
const SALT_ROUNDS = 10;

export const HashPassword = async (password: string, saltRounds: number) => {
    return await bcrypt.hash(password, saltRounds);
}

export const ComparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

export const GenerateToken = (userId: string, userRole: string) => {
    return jwt.sign({ id: userId, role: userRole }, config.env.JWT_SECRET, { expiresIn: '1h' });
}
