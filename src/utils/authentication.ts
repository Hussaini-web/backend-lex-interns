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

export const GenerateToken = (userId: string) => {
    return jwt.sign({ id: userId }, config.env.JWT_SECRET, { expiresIn: '1h' });
}
