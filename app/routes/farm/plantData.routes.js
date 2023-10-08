const authenticateToken = require("../../../middleware/auth");

module.exports = (app) => {
  var router = require("express").Router();
  setRouter(router, app, "plantData");
};

function setRouter(router, app, title) {
  let controller = require(`../../controllers/farm/${title}.controller.js`);
  router.get("/", controller.index);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);
  app.use(`/api/farm/${title}`, router);
}
