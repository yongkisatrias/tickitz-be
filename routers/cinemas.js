const router = require("express").Router();
const cinemasModel = require("../models/cinemas");

// -- Endpoint Cinemas -- //
// Get All Cinemas (/cinemas)
router.get("/cinemas", async (req, res) => {
  try {
    const request = await cinemasModel.getAllCinemas();

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

// Get Selected Cinema (/cinemas/:id)
router.get("/cinemas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await cinemasModel.getSelectedCinema(id);

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

// New Cinema (/cinemas)
router.post("/cinemas", async (req, res) => {
  try {
    const { movie_id, name, city, addres, show_times, price, logo } = req.body;

    const isInputValid = movie_id && name && city && addres && show_times && price && logo;

    // check if input is valid
    if (!isInputValid) {
      res.status(400).json({
        status: false,
        message: "Bad input, please make sure your input is completed",
      });

      return;
    }

    const request = await cinemasModel.newCinema({
      movie_id,
      name,
      city,
      addres,
      show_times,
      price,
      logo,
    });

    if (request.length > 0) {
      res.status(201).json({
        status: true,
        message: "Insert cinema success",
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

// Update Cinema (cinemas/:id)
router.put("/cinemas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const columns = ["movie_id", "name", "city", "addres", "show_times", "price", "logo"];

    const request = await cinemasModel.updateCinema(req.body, columns, id);

    if (request.length > 0) {
      res.status(202).json({
        status: true,
        message: "Update cinema success",
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

// Delete Cinema (/cinemas/:id)
router.delete("/cinemas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await cinemasModel.deleteCinema(id);

    res.status(200).json({
      status: true,
      message: "Delete data success",
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
