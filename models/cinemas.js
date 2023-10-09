const database = require("../database");

const modelCinemas = {
  getAllCinemas: async () => {
    const request = await database`
        SELECT id, movie_id, name, city, addres, price, logo FROM cinemas`;

    return request;
  },
  getSelectedCinema: async (id) => {
    const request = await database`
    SELECT * FROM cinemas WHERE id = ${id}`;

    return request;
  },
  newCinema: async (payload) => {
    const { movie_id, name, city, addres, show_times, price, logo } = payload;
    const request = await database`
    INSERT INTO cinemas
        (movie_id, name, city, addres, show_times, price, logo)
    VALUES
        (${movie_id}, ${name}, ${city}, ${addres}, ${show_times}, ${price}, ${logo}) RETURNING id`;

    return request;
  },
  updateCinema: async (reqBody, columns, id) => {
    const request = await database`
    UPDATE cinemas SET ${database(reqBody, columns)} WHERE id = ${id} RETURNING id`;

    return request;
  },
  deleteCinema: async (id) => {
    const request = await database`
    DELETE FROM cinemas WHERE id = ${id}`;

    return request;
  },
};

module.exports = modelCinemas;
