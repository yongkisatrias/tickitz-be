const router = require("express").Router();
const moviesController = require("../controllers/movies");

// Get All Movies (/movies)
router.get("/movies", moviesController._getAllMovies);

// Get Selected Movie (/movies/:id)
router.get("/movies/:id", moviesController._getSelectedMovie);

// New Movie (/movies)
router.post("/movies", moviesController._validationNewMovie, moviesController._newMovie);

// Update Movie (/movies/:id)
router.put("/movies/:id", moviesController._validationUpdateMovie, moviesController._updateMovie);

// Delete Movie (/movies/:id)
router.delete("/movies/:id", moviesController._deleteMovies);

module.exports = router;
