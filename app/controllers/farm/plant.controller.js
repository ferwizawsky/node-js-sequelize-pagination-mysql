const db = require("../../models");
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (list, page, limit) => {
  const { count: totalItems, rows: data } = list;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, data, totalPages, currentPage };
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }
  const tutorial = {
    name: req.body.name,
  };
  db.plants
    .create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating data.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.index = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  db.plants
    .findAndCountAll({
      where: condition,
      limit,
      offset,
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send({
        data: response,
        user: req.user,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findByPk(id)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving Tutorial with id=" + id,
//       });
//     });
// };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  db.plants
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "updated successfully.",
        });
      } else {
        res.send({
          message: `Failed Update`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.plants
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ",
      });
    });
};
