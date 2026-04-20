import UserRepository from "../repository/user.repository.js";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../util/jwt.util.js";

class UserService {
    static async getMyUserData(currentUserID) {
        const user = await UserRepository.getById(currentUserID);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role,
            email: user.email,
        };
    }

    static async login(emailOrUsername, password) {
        const user = await UserRepository.getUserByEmailOrUsername(emailOrUsername);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        if (!user.is_verified) {
            const error = new Error("User email not verified");
            error.statusCode = 403;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!password || !isPasswordValid) {
            const error = new Error("Invalid email or password");
            error.statusCode = 400;
            throw error;
        } 

        const tokenJWT = generateJWTToken({
            userID: user.id,
            email: user.email,
            username: user.username,
            role: user.role
        });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
            },
            token: tokenJWT,
        };
    }
    
    static async logout(token) {
        if (!token) {
            const error = new Error("Token is required");
            error.statusCode = 400;
            throw error;
        }
    }

    static async createUser({ name, username, email, password, role, currentUserID }) {
        const existingUserByEmail = await UserRepository.getByEmail(email);
        if (existingUserByEmail) {
            const error = new Error("Email is already in use");
            error.statusCode = 400;
            throw error;
        }

        const existingUserByUsername = await UserRepository.getByUsername(username);
        if (existingUserByUsername) {
            const error = new Error("Username is already in use");
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserRepository.create({
            name,
            username,
            email,
            isVerified: false,
            password: hashedPassword,
            role,
            createdBy: currentUserID,
        });

        return {
            id: newUser.id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            createdBy: newUser.created_by,
            isVerified: newUser.is_verified,
        };
    }
}

export default UserService;