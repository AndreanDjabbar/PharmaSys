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
}

export default UserService;