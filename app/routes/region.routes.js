module.exports = (app) => {
  const controller = require("../controllers/region.controller.js");

  var router = require("express").Router();

  router.get("/province/", controller.allProvince);
  router.get("/regency/", controller.allRegency);
  router.get("/district/", controller.allDistrict);
  router.get("/village/", controller.allVillage);
  router.get("/getcsv/", controller.getCsv);

  app.use("/api/region", router);
};
