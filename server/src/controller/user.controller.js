import UserService from "../service/user.service.js";
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

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const {user, token} = await AuthService.register(name, email, password);
    return responseSuccess(
      res,
      201,
      "Registration successful.. Please check email for otp verification.",
      "data",
      {
        user: user,
        token: token,
      }
    );
  } catch (e) {
    return responseError(res, 400, e.message, "error", e.message);
  }
};

export const verifyRegisterTokenController = async (req, res) => {
  const { token, email } = req.query;
  if (!token || !email) {
    const error = new Error("Token and email are required");
    error.statusCode = 400;
  }
  const result = await AuthService.verifyRegisterToken(token, email);
  return responseSuccess(res, 200, "Email verification successful", "data", {
    name: result.name,
    email: result.email,
  });
};

export const verifyRegisterOtpController = async (req, res) => {
  const { otpCode } = req.body;
  const { email, token } = req.query;
  const result = await AuthService.verifyRegisterOtp(token, email, otpCode);
  return responseSuccess(
    res,
    200,
    `OTP verification successful..Welcome to DineHub, ${result.name}`,
    "data",
    {
      name: result.name,
    }
  );
};

export const forgotPasswordEmailVerificationController = async (req, res) => {
  const { email } = req.body;
  const result = await AuthService.forgotPasswordEmailVerification(email);
  return responseSuccess(
    res,
    200,
    "Forgot password email verification sent",
    "data",
    result
  );
};

export const forgotPasswordLinkVerificationController = async (req, res) => {
  const { token, email } = req.query;
  const result = await AuthService.forgotPasswordLinkVerification(
    token,
    email
  );
  return responseSuccess(
    res,
    200,
    "Forgot password link verification successful",
    "data",
    result
  );
};

export const ForgotPasswordResetController = async (req, res) => {
  const { token, email } = req.query;
  const { newPassword } = req.body;
  if (!token || !email) {
    const error = new Error("Token and email are required");
    error.statusCode = 400;
    throw error;
  }
  const result = await AuthService.forgotPasswordReset(
    token,
    email,
    newPassword
  );
  return responseSuccess(
    res,
    200,
    "Reset password successful",
    "data",
    result
  );
};

export const logoutController = async (req, res) => {
  const token = req.cookies.token;
  await AuthService.logout(token);
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
  const { email, password } = req.body;
  const result = await UserService.login(email, password);
  const token = result.token;
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: COOKIE_TOKEN_EXPIRES_HOURS * 60 * 60 * 1000,
  });
  return responseSuccess(res, 200, "Login successful", "data", {
    user: result.user,
  });
};

export const createTenantController = async (req, res) => {
    const result = await UserService.createTenant(req.body);
    return responseSuccess(res, 201, "Tenant created successfully", "data", result);
};

export const createStaffController = async (req, res) => {
    const { name, email, password, role, restaurantId } = req.body;
    const { userID } = req.user;
    const result = await UserService.createStaff({ name, email, password, role, restaurantId, currentUserID: userID });
    return responseSuccess(res, 201, "User created successfully", "data", result);
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