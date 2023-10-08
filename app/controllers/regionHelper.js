exports.getVillage = (db) => {
  return [
    {
      model: db.village,
      as: "village",
      required: false,
      attributes: {
        exclude: ["districtId", "id"],
      },
      include: [
        {
          model: db.district,
          as: "district",
          required: false,
          attributes: {
            exclude: ["regencyId", "id"],
          },
          include: [
            {
              model: db.regency,
              as: "regency",
              required: false,
              attributes: {
                exclude: ["provinceId", "id"],
              },
              include: [
                {
                  model: db.province,
                  as: "province",
                  required: false,
                  attributes: {
                    exclude: ["provinceId", "id"],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
};
