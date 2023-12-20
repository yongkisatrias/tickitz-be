require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const helmet = require("helmet");
const cors = require("cors");

// import router
const moviesRouter = require("./src/routers/movies");
const cinemasRouter = require("./src/routers/cinemas");
const usersRouter = require("./src/routers/users");

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

// use routers
app.use(moviesRouter);
app.use(cinemasRouter);
app.use(usersRouter);

// Home
app.get("/", (req, res) => {
  res.send("API For Tickitz");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
