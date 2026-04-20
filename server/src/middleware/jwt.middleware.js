import { verifyToken } from "../util/jwt.util.js";
import { responseError } from "../util/response.util.js";
import logger from "../../logs/logger.js";

const validateToken = async(req, res, next) => {
    const token = req.cookies.token; 
    if (!token) {
        logger.warn("No token provided in cookies");
        return responseError(res, 401, "Access token is required", "error", "UNAUTHORIZED");
    }

    try {
        const decoded = verifyToken(token);

        req.user = {
            userID: decoded.userID,
            email: decoded.email,
            username: decoded.username,
            role: decoded.role
        };

        next();
    } catch (error) {
        logger.error(`Token verification failed: ${error.message}`);
        
        if (error.message === 'jwt expired' || error.name === 'TokenExpiredError') {
            return responseError(res, 401, "Token has expired", "error", "TOKEN_EXPIRED");
        }
        
        return responseError(res, 403, "Invalid token", "error", "INVALID_TOKEN");
    }
};

export default validateToken;