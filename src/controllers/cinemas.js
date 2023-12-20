const cinemasModel = require("../models/cinemas");
const { Validator } = require("node-input-validator");

const cinemasController = {
  _getAllCinemas: async (req, res) => {
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
  },
  _getSelectedCinema: async (req, res) => {
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
  },
  _validationNewCinema: async (req, res, next) => {
    const schema = new Validator(req.body, {
      movie_id: "required|integer",
      name: "required|minLength:1|maxLength:100",
      city: "required|minLength:1|maxLength:100",
      addres: "required|minLength:1|maxLength:100",
      show_times: "required|array|arrayUnique",
      price: "required|integer",
      logo: "required|url",
    });

    schema.check().then((matched) => {
      if (!matched) {
        res.status(422).json({
          status: false,
          message: schema.errors,
          data: null,
        });
      } else {
        next();
      }
    });
  },
  _newCinema: async (req, res) => {
    try {
      const { movie_id, name, city, addres, show_times, price, logo } =
        req.body;

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
  },
  _validationUpdateCinema: async (req, res, next) => {
    const schema = new Validator(req.body, {
      movie_id: "required|integer",
      name: "required|minLength:1|maxLength:100",
      city: "required|minLength:1|maxLength:100",
      addres: "required|minLength:1|maxLength:100",
      show_times: "required|array|arrayUnique",
      price: "required|integer",
      logo: "required|url",
    });

    schema.check().then((matched) => {
      if (!matched) {
        res.status(422).json({
          status: false,
          message: schema.errors,
          data: null,
        });
      } else {
        next();
      }
    });
  },
  _updateCinema: async (req, res) => {
    try {
      const { id } = req.params;
      const columns = [
        "movie_id",
        "name",
        "city",
        "addres",
        "show_times",
        "price",
        "logo",
      ];

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
  },
  _deleteCinema: async (req, res) => {
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
  },
};

module.exports = cinemasController;
