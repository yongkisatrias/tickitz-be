const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const usersModel = require("../models/users");

// Middleware Function
const checkJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);

    if (decoded) {
      next();
    } else {
      res.status(401).json({
        status: false,
        message: "Token incorrect",
        data: [],
      });
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Token incorrect",
      data: [],
    });
  }
};

// -- Endpoint User -- //
// Get All Users (/users)
router.get("/users", async (req, res) => {
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
});

// Register (/users/register)
router.post("/users/register", async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email, password, photo_profile } = req.body;
    const isInputValid = first_name && last_name && phone_number && email && password && photo_profile;

    // check if input is valid
    if (!isInputValid) {
      res.status(400).json({
        status: false,
        message: "Bad input, please make sure your input is completed",
      });

      return;
    }
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
});

// Login (/users/login)
router.post("/users/login", async (req, res) => {
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
});

// Get Detail Profil (/users/me)
router.get("/users/me", checkJwt, async (req, res) => {
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
});

// Edit Profile (/users/edit)
router.put("/users/edit", checkJwt, async (req, res) => {
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
});

// Edit Profile Password (/users/edit/password)
router.put("/users/edit/password", checkJwt, async (req, res) => {
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
});

module.exports = router;
