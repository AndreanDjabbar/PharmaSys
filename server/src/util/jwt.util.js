import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN } from './env.util.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../../keys/private.key'), 'utf8');
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../../keys/public.key'), 'utf8');

export const generateJWTToken = ({
    userID,
    email,
    role
}) => {
    const payload = {
        userID,
        email,
        role,
    };

    return jwt.sign(payload, PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: JWT_EXPIRES_IN,
    });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256'],
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
