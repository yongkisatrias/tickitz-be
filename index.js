require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const database = require("./database");
const helmet = require("helmet");
const cors = require("cors");

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

// -- Endpoint Movies -- //
// Get All Movies
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

// Get Selected Movie
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
// New Movie
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

// /users/me

// New User (/users/register)
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
    }

    const request = await database`INSERT INTO users
      (first_name, last_name, phone_number, email, password, photo_profile)
    values
      (${first_name}, ${last_name}, ${phone_number}, ${email}, ${password}, ${photo_profile}) RETURNING id`;

    if (request.length > 0) {
      res.status(201).json({
        status: true,
        message: "Insert data success",
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

// /users/login
// /users/edit

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
