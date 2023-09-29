const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

// grant access for express can accept input from outside
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

// MOVIES START
app.get("/movies", async (req, res) => {
  try {
    const request = await database`SELECT id, name, duration, genres, poster FROM movies`;

    res.json({
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

app.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await database`SELECT * FROM movies WHERE id = ${id}`;

    res.json({
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
      res.json({
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
// MOVIES END

// --------------------------------- //

// CINEMA START
app.get("/cinemas", async (req, res) => {
  try {
    const request = await database`SELECT id, movie_id, name, city, addres, price, logo FROM cinemas`;

    res.json({
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

app.get("/cinemas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await database`SELECT * FROM cinemas WHERE id = ${id}`;

    res.json({
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

app.post("/cinemas", async (req, res) => {
  try {
    const { movie_id, name, city, addres, show_times, price, logo } = req.body;

    const isInputValid = movie_id && name && city && addres && show_times && price && logo;

    // check if input is valid
    if (!isInputValid) {
      res.status(400).json({
        status: false,
        message: "Bad input, please make sure your input is completed",
      });
    }

    const request = await database`INSERT INTO cinemas
      (movie_id, name, city, addres, show_times, price, logo)
    values
      (${movie_id}, ${name}, ${city}, ${addres}, ${show_times}, ${price}, ${logo}) RETURNING id`;

    if (request.length > 0) {
      res.json({
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
// CINEMA END

// --------------------------------- //

// USER START
app.get("/users", async (req, res) => {
  try {
    const request = await database`SELECT * FROM users`;

    res.json({
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

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await database`SELECT * FROM users WHERE id = ${id}`;

    res.json({
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

app.post("/users", async (req, res) => {
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
      res.json({
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
// USER END

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
