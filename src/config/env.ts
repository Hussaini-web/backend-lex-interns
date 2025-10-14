import dotenv from 'dotenv';
dotenv.config();

const env = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/lex-interndb',
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'LEXINTERNTOKEN',
    NODE_ENV: process.env.NODE_ENV || 'development',
};

export default env;