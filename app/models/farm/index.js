module.exports = (dbe) => {
  let db = dbe;
  const farm = require("./farmer.model.js");
  db.farmers = farm.farmer(dbe.sequelize, dbe.Sequelize);
  db.lands = farm.land(dbe.sequelize, dbe.Sequelize);
  db.farmerGroups = farm.farmerGroup(dbe.sequelize, dbe.Sequelize);
  db.plants = farm.plant(dbe.sequelize, dbe.Sequelize);
  db.plantDatas = farm.plantData(dbe.sequelize, dbe.Sequelize);

  db.village.hasMany(db.lands, { as: "lands" });
  db.lands.belongsTo(db.village, {
    foreignKey: "villageId",
    as: "village",
  });

  db.village.hasMany(db.farmers, { as: "farmers" });
  db.farmers.belongsTo(db.village, {
    foreignKey: "villageId",
    as: "village",
  });

  db.village.hasMany(db.plantDatas, { as: "plantDatas" });
  db.plantDatas.belongsTo(db.village, {
    foreignKey: "villageId",
    as: "village",
  });

  db.plants.hasMany(db.plantDatas, { as: "plantDatas" });
  db.plantDatas.belongsTo(db.plants, {
    foreignKey: "plantId",
    as: "plant",
  });
  return db;
};
