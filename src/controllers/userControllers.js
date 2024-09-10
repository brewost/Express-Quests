const database = require("../../database");

const getUsers = (req, res) => {
  // Retrieve query parameters for language and city
  const { language, city } = req.query;

  // Base SQL query
  let query = "SELECT * FROM users";
  const queryParams = [];

  // Add conditions based on query parameters
  if (language) {
    query += " WHERE language = ?";
    queryParams.push(language);
  }

  if (city) {
    // Check if 'language' is already added to avoid multiple WHERE clauses
    if (queryParams.length > 0) {
      query += " AND city = ?";
    } else {
      query += " WHERE city = ?";
    }
    queryParams.push(city);
  }

  // Execute the SQL query
  database
    .query(query, queryParams)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language],
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "update users set firstname = ? , lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id],
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database

    .query("delete from users where id = ?", [id])

    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);

      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
};
