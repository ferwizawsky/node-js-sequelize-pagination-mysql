module.exports = (app) => {
  const controller = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  router.post("/login/", controller.login);
  router.post("/register/", controller.register);

  app.use("/api/auth", router);
};
