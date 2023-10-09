const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const usersController = require("../controllers/users");

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
router.get("/users", usersController._getAllUsers);

// Register (/users/register)
router.post("/users/register", usersController._validationRegister, usersController._register);

// Login (/users/login)
router.post("/users/login", usersController._validationLogin, usersController._login);

// Get Detail Profil (/users/me)
router.get("/users/me", checkJwt, usersController._getDetailUser);

// Edit Profile (/users/edit)
router.put("/users/edit", checkJwt, usersController._validationEditProfile, usersController._editProfile);

// Edit Profile Password (/users/edit/password)
router.put("/users/edit/password", checkJwt, usersController._validationEditPassword, usersController._editPassword);

module.exports = router;
