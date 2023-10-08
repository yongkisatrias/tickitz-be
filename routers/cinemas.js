const database = require("../database");
const router = require("express").Router();

// -- Endpoint Cinemas -- //
// Get All Cinemas (/cinemas)
router.get("/cinemas", async (req, res) => {
  try {
    const request = await database`SELECT id, movie_id, name, city, addres, price, logo FROM cinemas`;

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
    const request = await database`SELECT * FROM cinemas WHERE id = ${id}`;

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

    const request = await database`INSERT INTO cinemas
        (movie_id, name, city, addres, show_times, price, logo)
      values
        (${movie_id}, ${name}, ${city}, ${addres}, ${show_times}, ${price}, ${logo}) RETURNING id`;

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

    const request = await database`UPDATE cinemas SET ${database(req.body, columns)} WHERE id = ${id} RETURNING id`;

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
    const request = await database`DELETE FROM cinemas WHERE id = ${id}`;

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
