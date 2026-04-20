import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from './env.util.js';
import path from 'path';
import { fileURLToPath } from 'url';

export const generateJWTToken = ({
    userID,
    email,
    username,
    role
}) => {
    const payload = {
        userID,
        email,
        username,
        role,
    };

    return jwt.sign(payload, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: JWT_EXPIRES_IN,
    });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET, {
            algorithms: ['HS256'],
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        } else {
            throw new Error('Token verification failed');
        }
    }
};

export const decodeToken = (token) => {
    return jwt.decode(token);
};
