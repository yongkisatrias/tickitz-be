const database = require("../database");

const modelUsers = {
  getAllUsers: async () => {
    const request = await database`
    SELECT first_name, last_name, phone_number, photo_profile FROM users`;

    return request;
  },
  checkEmail: async (email) => {
    const checkEmail = await database`SELECT * FROM users WHERE email = ${email}`;

    return checkEmail;
  },
  register: async (payload) => {
    const { first_name, last_name, phone_number, email, hash, photo_profile } = payload;
    const request = await database`
    INSERT INTO users
        (first_name, last_name, phone_number, email, password, photo_profile)
    VALUES
        (${first_name}, ${last_name}, ${phone_number}, ${email}, ${hash}, ${photo_profile}) RETURNING id`;

    return request;
  },
  login: async (email) => {
    const checkEmail = await database`
    SELECT * FROM users WHERE email = ${email}`;

    return checkEmail;
  },
  getDetailProfil: async (decoded) => {
    const request = await database`
    SELECT * FROM users WHERE id = ${decoded.id}`;

    return request;
  },
  editProfile: async (reqBody, columns, id) => {
    const request = await database`
    UPDATE users SET ${database(reqBody, columns)} WHERE id = ${id} RETURNING id`;

    return request;
  },
  editProfilePassword: async (hash, columns, id) => {
    const request = await database`
    UPDATE users SET ${database({ password: hash }, columns)} WHERE id = ${id} RETURNING id`;

    return request;
  },
};

module.exports = modelUsers;
