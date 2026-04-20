import postgreSQL from "../config/postgres.config.js";
import { PrismaClient } from "../../prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

class UserRepository {
  static async getByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  static async create({
    name,
    username,
    email,
    isVerified,
    password,
    role,
    createdBy,
  }) {
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
        role,
        is_verified: isVerified,
        created_by: createdBy,
      },
    });
    return newUser;
  }

  static async getUserByEmailOrUsername(emailOrUsername) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },
    });
    return user;
  }

  static async getByUsername(username) {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  }

  static async getById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }
}

export default UserRepository;
