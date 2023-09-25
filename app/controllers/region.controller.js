const db = require("../models");
const Province = db.province;
const Regency = db.regency;
const District = db.district;
const Village = db.village;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (datas, page, limit) => {
  const { count: totalItems, rows: data } = datas;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, data, totalPages, currentPage };
};

exports.getCsv = (req, res) => {
  const sqlQuery = "SELECT * FROM provinces";
  db.sequelize
    .query(sqlQuery, { type: db.Sequelize.QueryTypes.SELECT })
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

exports.allProvince = (req, res) => {
  const { page, size, title } = req.query;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Province.findAndCountAll({
    // where: condition,
    limit,
    offset,
    // include: [
    //   {
    //     model: Comment,
    //     as: "comments", // Alias for the association
    //     required: false,
    //     attributes: ["id", "name", "text", "createdAt"],
    //     include: [
    //       {
    //         model: User,
    //         as: "user",
    //         required: false,
    //         attributes: {
    //           exclude: ["password"],
    //         },
    //       },
    //     ], // Include User model and select specific attributes
    //   },
    // ],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Data.",
      });
    });
};

exports.allRegency = (req, res) => {
  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);
  Regency.findAndCountAll({
    where: condition,
    limit,
    offset,
    attributes: {
      exclude: ["provinceId"],
    },
    include: [
      {
        model: Province,
        as: "province", // Alias for the association
        required: false,
        attributes: {
          exclude: ["id"],
        },
        // include: [
        //   {
        //     model: User,
        //     as: "user",
        //     required: false,
        //     attributes: {
        //       exclude: ["password"],
        //     },
        //   },
        // ],
      },
    ],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Data.",
      });
    });
};

exports.allDistrict = (req, res) => {
  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);
  District.findAndCountAll({
    where: condition,
    limit,
    offset,
    attributes: {
      exclude: ["provinceId"],
    },
    include: [
      {
        model: Regency,
        as: "regency", // Alias for the association
        required: false,
        attributes: {
          exclude: ["id", "provinceId"],
        },
        include: [
          {
            model: Province,
            as: "province", // Alias for the association
            required: false,
            attributes: {
              exclude: ["id"],
            },
          },
        ],
      },
    ],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Data.",
      });
    });
};

exports.allVillage = (req, res) => {
  const { page, size, name, detail } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);
  Village.findAndCountAll({
    where: condition,
    limit,
    offset,
    attributes: {
      exclude: ["districtId"],
    },
    ...(detail
      ? {
          include: [
            {
              model: District,
              as: "district", // Alias for the association
              required: false,
              attributes: { exclude: ["id", "regencyId"] },
              include: [
                {
                  model: Regency,
                  as: "regency", // Alias for the association
                  required: false,
                  attributes: {
                    exclude: ["id", "provinceId"],
                  },
                  include: [
                    {
                      model: Province,
                      as: "province", // Alias for the association
                      required: false,
                      attributes: {
                        exclude: ["id"],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }
      : {}),
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Data.",
      });
    });
};
