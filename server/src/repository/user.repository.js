import postgreSQL from "../config/postgres.config.js";

class UserRepository {
  static async getByEmail(email) {
    const [user] = await postgreSQL`
            SELECT * FROM public."User" 
            WHERE LOWER(email) = LOWER(${email})
        `;
    return user;
  }

  static async getById(id) {
    const [user] = await postgreSQL`
            SELECT * FROM public."User" WHERE id = ${id}
        `;
    return user;
  }
}

export default UserRepository;
