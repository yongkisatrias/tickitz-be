require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const database = require("./database");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// grant access for express can accept input from outside
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// cors
app.use(cors(corsOptions));

// helmet
app.use(helmet());

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

// -- Endpoint Movies -- //
// Get All Movies (/movies)
app.get("/movies", async (req, res) => {
  try {
    const request = await database`SELECT id, name, duration, genres, poster FROM movies`;

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

// Get Selected Movie (/movies/:id)
app.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await database`SELECT * FROM movies WHERE id = ${id}`;

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
// New Movie (/movies)
app.post("/movies", async (req, res) => {
  try {
    const { name, release_date, duration, genres, directed_by, casts, synopsis, poster } = req.body;

    const isInputValid = name && release_date && duration && genres && directed_by && casts && synopsis && poster;

    // check if input is valid
    if (!isInputValid) {
      res.status(400).json({
        status: false,
        message: "Bad input, please make sure your input is completed",
      });

      return;
    }

    const request = await database`INSERT INTO movies
      (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
    values
      (${name}, ${release_date}, ${duration}, ${genres}, ${directed_by}, ${casts}, ${synopsis}, ${poster}) RETURNING id`;

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

// Update Movie
app.put("/movies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, release_date, duration, genres, directed_by, casts, synopsis, poster } = req.body;
  const request = await database`UPDATE movies SET name=${name}, release_date=${release_date}, duration=${duration}, genres=${genres}, directed_by=${directed_by}, casts=${casts}, synopsis=${synopsis}, poster=${poster} WHERE id=${id}`;
  res.send("Data updated");
});

// Delete Movie
app.delete("/movies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const request = await database`DELETE FROM movies WHERE id=${id}`;
  res.send("Data deleted");
});

// ------------------------

// -- Endpoint Cinemas -- //

// ------------------------

// -- Endpoint User -- //
// Get All Users (/users)
app.get("/users", async (req, res) => {
  try {
    const request = await database`SELECT first_name, last_name, phone_number, photo_profile FROM users`;

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

// Get Detail Profil (/users/me)
app.get("/users/me", checkJwt, async (req, res) => {
  try {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);

    const request = await database`SELECT * FROM users WHERE id = ${decoded.id}`;

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
app.post("/users/register", async (req, res) => {
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
    const checkEmail = await database`SELECT * FROM users WHERE email = ${email}`;

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

    const request = await database`INSERT INTO users
      (first_name, last_name, phone_number, email, password, photo_profile)
    values
      (${first_name}, ${last_name}, ${phone_number}, ${email}, ${hash}, ${photo_profile}) RETURNING id`;

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
app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkEmail = await database`SELECT * FROM users WHERE email = ${email}`;

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

// Edit Profil (/users/edit)
app.put("/users/edit", checkJwt, async (req, res) => {
  try {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);
    const { id } = decoded;

    const columns = ["first_name", "last_name", "phone_number", "email", "photo_profile"];

    const request = await database`
      UPDATE users SET ${database(req.body, columns)} WHERE id = ${id} RETURNING id`;

    if (request.length > 0) {
      res.status(200).json({
        status: true,
        message: "Update data success",
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

// Edit Profil Password (/users/edit/password)
app.put("/users/edit/password", checkJwt, async (req, res) => {
  try {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);
    const { id } = decoded;

    const columns = ["password"];

    // hash password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const request = await database`UPDATE users SET ${database({ password: hash }, columns)} WHERE id = ${id} RETURNING id`;

    if (request.length > 0) {
      res.status(200).json({
        status: true,
        message: "Update data success",
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

// ------------------------

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// // grant access for express can accept input from outside
// app.use(express.urlencoded({ extended: false }));
// // parse application/json
// app.use(express.json());

// // MOVIES START
// app.get("/movies", async (req, res) => {
//   try {
//     const request = await database`SELECT id, name, duration, genres, poster FROM movies`;

//     res.status(200).json({
//       status: true,
//       message: "Get data success",
//       data: request,
//     });
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something wrong in our server",
//       data: [],
//     });
//   }
// });

// app.get("/movies/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const request = await database`SELECT * FROM movies WHERE id = ${id}`;

//     res.status(200).json({
//       status: true,
//       message: "Get data success",
//       data: request,
//     });
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something wrong in our server",
//       data: [],
//     });
//   }
// });

// app.post("/movies", async (req, res) => {
//   try {
//     const { name, release_date, duration, genres, directed_by, casts, synopsis, poster } = req.body;

//     const isInputValid = name && release_date && duration && genres && directed_by && casts && synopsis && poster;

//     // check if input is valid
//     if (!isInputValid) {
//       res.status(400).json({
//         status: false,
//         message: "Bad input, please make sure your input is completed",
//       });
//     }

//     const request = await database`INSERT INTO movies
//       (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
//     values
//       (${name}, ${release_date}, ${duration}, ${genres}, ${directed_by}, ${casts}, ${synopsis}, ${poster}) RETURNING id`;

//     if (request.length > 0) {
//       res.status(201).json({
//         status: true,
//         message: "Insert data success",
//       });
//     }
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something wrong in our server",
//       data: [],
//     });
//   }
// });
// // MOVIES END

// // --------------------------------- //

// // CINEMA START
// app.get("/cinemas", async (req, res) => {
//   try {
//     const request = await database`SELECT id, movie_id, name, city, addres, price, logo FROM cinemas`;

//     res.status(200).json({
//       status: true,
//       message: "Get data success",
//       data: request,
//     });
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something wrong in our server",
//       data: [],
//     });
//   }
// });

// app.get("/cinemas/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const request = await database`SELECT * FROM cinemas WHERE id = ${id}`;

//     res.status(200).json({
//       status: true,
//       message: "Get data success",
//       data: request,
//     });
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something wrong in our server",
//       data: [],
//     });
//   }
// });

// app.post("/cinemas", async (req, res) => {
//   try {
//     const { movie_id, name, city, addres, show_times, price, logo } = req.body;

//     const isInputValid = movie_id && name && city && addres && show_times && price && logo;

//     // check if input is valid
//     if (!isInputValid) {
//       res.status(400).json({
//         status: false,
//         message: "Bad input, please make sure your input is completed",
//       });
//     }

//     const request = await database`INSERT INTO cinemas
//       (movie_id, name, city, addres, show_times, price, logo)
//     values
//       (${movie_id}, ${name}, ${city}, ${addres}, ${show_times}, ${price}, ${logo}) RETURNING id`;

//     if (request.length > 0) {
//       res.status(201).json({
//         status: true,
//         message: "Insert data success",
//       });
//     }
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something wrong in our server",
//       data: [],
//     });
//   }
// });
// // CINEMA END

// // --------------------------------- //

// // USER START
// app.get("/users", async (req, res) => {
//   try {
//     const request = await database`SELECT * FROM users`;

//     res.status(200).json({
//       status: true,
//       message: "Get data success",
//       data: request,
//     });
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something wrong in our server",
//       data: [],
//     });
//   }
// });

// app.get("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const request = await database`SELECT * FROM users WHERE id = ${id}`;

//     res.status(200).json({
//       status: true,
//       message: "Get data success",
//       data: request,
//     });
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something wrong in our server",
//       data: [],
//     });
//   }
// });

// app.post("/users", async (req, res) => {
//   try {
//     const { first_name, last_name, phone_number, email, password, photo_profile } = req.body;

//     const isInputValid = first_name && last_name && phone_number && email && password && photo_profile;

//     // check if input is valid
//     if (!isInputValid) {
//       res.status(400).json({
//         status: false,
//         message: "Bad input, please make sure your input is completed",
//       });
//     }

//     const request = await database`INSERT INTO users
//     (first_name, last_name, phone_number, email, password, photo_profile)
//     values
//       (${first_name}, ${last_name}, ${phone_number}, ${email}, ${password}, ${photo_profile}) RETURNING id`;

//     if (request.length > 0) {
//       res.status(201).json({
//         status: true,
//         message: "Insert data success",
//       });
//     }
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something wrong in our server",
//       data: [],
//     });
//   }
// });
// // USER END

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
