const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/users");
const { Validator } = require("node-input-validator");

const usersController = {
  _getAllUsers: async (req, res) => {
    try {
      const request = await usersModel.getAllUsers();

      res.status(200).json({
        status: true,
        message: "Get data success",
        data: request,
      });
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
  _validationRegister: async (req, res, next) => {
    const schema = new Validator(req.body, {
      first_name: "required|minLength:1|maxLength:100",
      last_name: "required|minLength:1|maxLength:100",
      phone_number: "required|phoneNumber",
      email: "required|email",
      password: "required|minLength:5",
      photo_profile: "required|url",
    });

    schema.check().then((matched) => {
      if (!matched) {
        res.status(422).json({
          status: false,
          message: schema.errors,
          data: null,
        });
      } else {
        next();
      }
    });
  },
  _register: async (req, res) => {
    try {
      const { first_name, last_name, phone_number, email, password, photo_profile } = req.body;

      // check unique email
      const checkEmail = await usersModel.checkEmail(email);

      if (checkEmail.length > 0) {
        res.status(400).json({
          status: false,
          message: "Email is already registered, please use another email",
        });

        return;
      }

      // hash password
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      const request = await usersModel.register({
        first_name,
        last_name,
        phone_number,
        email,
        hash,
        photo_profile,
      });

      if (request.length > 0) {
        res.status(201).json({
          status: true,
          message: "Insert data success",
        });

        return;
      }
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
  _validationLogin: async (req, res, next) => {
    const schema = new Validator(req.body, {
      email: "required|email",
      password: "required|minLength:5",
    });

    schema.check().then((matched) => {
      if (!matched) {
        res.status(422).json({
          status: false,
          message: schema.errors,
          data: null,
        });
      } else {
        next();
      }
    });
  },
  _login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const checkEmail = await usersModel.login(email);

      // check if email registered
      if (checkEmail.length == 0) {
        res.status(400).json({
          status: false,
          message: "Email not registered",
        });

        return;
      }

      // check if password correct
      const isMatch = bcrypt.compareSync(password, checkEmail[0].password);

      if (isMatch) {
        const token = jwt.sign(checkEmail[0], process.env.APP_SECRET_TOKEN);

        res.status(200).json({
          status: true,
          message: "Login success",
          accessToken: token,
          data: checkEmail,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Incorrect password, please enter the correct password",
        });
      }
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
  _getDetailUser: async (req, res) => {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);

      const request = await usersModel.getDetailProfil(decoded);

      res.status(200).json({
        status: true,
        message: "Get data success",
        data: request,
      });
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
  _validationEditProfile: async (req, res, next) => {
    const schema = new Validator(req.body, {
      first_name: "required|minLength:1|maxLength:100",
      last_name: "required|minLength:1|maxLength:100",
      phone_number: "required|phoneNumber",
      email: "required|email",
      photo_profile: "required|url",
    });

    schema.check().then((matched) => {
      if (!matched) {
        res.status(422).json({
          status: false,
          message: schema.errors,
          data: null,
        });
      } else {
        next();
      }
    });
  },
  _editProfile: async (req, res) => {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);
      const { id } = decoded;

      const columns = ["first_name", "last_name", "phone_number", "email", "photo_profile"];

      const request = await usersModel.editProfile(req.body, columns, id);

      if (request.length > 0) {
        res.status(200).json({
          status: true,
          message: "Update data success",
        });

        return;
      }
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
  _validationEditPassword: async (req, res, next) => {
    // schema
    const schema = new Validator(req.body, {
      password: "required|minLength:5",
    });

    schema.check().then((matched) => {
      if (!matched) {
        res.status(422).json({
          status: false,
          message: schema.errors,
          data: null,
        });
      } else {
        next();
      }
    });
  },
  _editPassword: async (req, res) => {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);
      const { id } = decoded;

      const columns = ["password"];

      // hash password
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const request = await usersModel.editProfilePassword(hash, columns, id);

      if (request.length > 0) {
        res.status(200).json({
          status: true,
          message: "Update data success",
        });

        return;
      }
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
};

module.exports = usersController;
