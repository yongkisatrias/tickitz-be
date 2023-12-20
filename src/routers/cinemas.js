const router = require("express").Router();
const cinemasController = require("../controllers/cinemas");

// -- Endpoint Cinemas -- //
// Get All Cinemas (/cinemas)
router.get("/cinemas", cinemasController._getAllCinemas);

// Get Selected Cinema (/cinemas/:id)
router.get("/cinemas/:id", cinemasController._getSelectedCinema);

// New Cinema (/cinemas)
router.post(
  "/cinemas",
  cinemasController._validationNewCinema,
  cinemasController._newCinema
);

// Update Cinema (cinemas/:id)
router.put(
  "/cinemas/:id",
  cinemasController._validationUpdateCinema,
  cinemasController._updateCinema
);

// Delete Cinema (/cinemas/:id)
router.delete("/cinemas/:id", cinemasController._deleteCinema);

module.exports = router;
