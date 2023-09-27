const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

app.get("/movies", async (req, res) => {
  try {
    const request = await database`SELECT * FROM movies`;
    req.json(request);

    res.json({
      status: true,
      message: "Get data success",
      data: request,
    });
  } catch (error) {}
});

app.get("/movies/:id", (req, res) => {
  //   req = request
  //   res = response
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
