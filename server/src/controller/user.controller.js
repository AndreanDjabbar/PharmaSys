import UserService from "../service/user.service.js";
import { NODE_ENV } from "../util/env.util.js";
import { responseSuccess } from "../util/response.util.js"; 

export const getMyUserDataController = async (req, res) => {  
    const userID = req.user.userID; 
    if(!userID) {
        const error = new Error("User ID not found in token");
        error.statusCode = 400;
        throw error;
    }
    const result = await UserService.getMyUserData(userID);
    return responseSuccess(
        res,
        200,
        "My user data retrieved successfully",
        "data",
        {
            user: result
        }
    );
};

export const logoutController = async (req, res) => {
    const token = req.cookies.token;
    await UserService.logout(token);
    res.clearCookie("token", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "Lax",
    });
    return responseSuccess(
        res,
        200,
        "Logout successful",
        "data",
        null
    );
};

export const loginController = async (req, res) => {
    const { emailOrUsername, password } = req.body;
    const result = await UserService.login(emailOrUsername, password);
    const token = result.token;
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
    });
    return responseSuccess(res, 200, "Login successful", "data", {
        user: result.user,
    });
};

export const createUserController = async (req, res) => {
    const {
        name,
        username,
        email, 
        password, 
        role,
    } = req.body;
    const { userID } = req.user;
    const result = await UserService.createUser({
        name, 
        username,
        email, 
        password, 
        role, 
        currentUserID: userID 
    });
    return responseSuccess(res, 201, "User created successfully", "data", result);
}

export const getUsersController = async (req, res) => {
    const { role } = req.user;
    const result = await UserService.getUsers(role);
    return responseSuccess(res, 200, "Users retrieved successfully", "data", {
        users: result
    });
}

export const updateStaffController = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.user;
    const { name, email } = req.body;
    const result = await UserService.updateStaff({id, name, email, currentUserID: userID});
    return responseSuccess(res, 200, "User updated successfully", "data", {
        user: result
    });
}

export const deleteStaffController = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.user;
    const result = await UserService.deleteStaff(id, userID);
    return responseSuccess(res, 200, "User deleted successfully", "data", result);
}

export const getStaffByRestaurantIdController = async (req, res) => {
    const { restaurantId } = req.params;
    const staffRole = req.query.role;
    const currentUserID = req.user.userID;
    const result = await UserService.getStaffByRestaurantId(restaurantId, staffRole, currentUserID);
    return responseSuccess(res, 200, "Staff fetched", "data", {
        staff: result
    });
}