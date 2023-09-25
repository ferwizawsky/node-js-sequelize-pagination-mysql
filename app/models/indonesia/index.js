module.exports = (db) => {
  let dbe = db;
  dbe.province = require("./component.model.js")(
    dbe.sequelize,
    dbe.Sequelize,
    "province"
  );
  dbe.regency = require("./component.model.js")(
    dbe.sequelize,
    dbe.Sequelize,
    "regency"
  );
  dbe.district = require("./component.model.js")(
    dbe.sequelize,
    dbe.Sequelize,
    "district"
  );
  dbe.village = require("./component.model.js")(
    dbe.sequelize,
    dbe.Sequelize,
    "village"
  );

  dbe.district.hasMany(dbe.village, { as: "villages" });
  dbe.village.belongsTo(dbe.district, {
    foreignKey: "districtId",
    as: "district",
  });

  dbe.regency.hasMany(dbe.district, { as: "districts" });
  dbe.district.belongsTo(dbe.regency, {
    foreignKey: "regencyId",
    as: "regency",
  });

  dbe.province.hasMany(dbe.regency, { as: "regencies" });
  dbe.regency.belongsTo(dbe.province, {
    foreignKey: "provinceId",
    as: "province",
  });

  return dbe;
};
