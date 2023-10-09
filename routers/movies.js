const router = require("express").Router();
const moviesModel = require("../models/movies");

// Get All Movies (/movies)
router.get("/movies", async (req, res) => {
  try {
    const request = await moviesModel.getAllMovies();

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
router.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await moviesModel.getSelectedMovie(id);

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
router.post("/movies", async (req, res) => {
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

    const request = await moviesModel.newMovie({
      name,
      release_date,
      duration,
      genres,
      directed_by,
      casts,
      synopsis,
      poster,
    });

    if (request.length > 0) {
      res.status(201).json({
        status: true,
        message: "Insert new movie success",
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

// Update Movie (/movies/:id)
router.put("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const columns = ["name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster"];

    const request = await moviesModel.updateMovies(req.body, columns, id);

    if (request.length > 0) {
      res.status(202).json({
        status: true,
        message: "Update movie success",
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

// Delete Movie (/movies/:id)
router.delete("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await moviesModel.deleteMovie(id);

    res.status(200).json({
      status: true,
      message: "Delete movie success",
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

module.exports = router;
