module.exports = (app) => {
  require("./farmer.routes")(app);
  require("./plant.routes")(app);
  require("./plantData.routes")(app);
  require("./farmerGroup.routes")(app);
  require("./land.routes")(app);
};
