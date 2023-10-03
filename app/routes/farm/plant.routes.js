const authenticateToken = require("../../../middleware/auth");

module.exports = (app) => {
  var router = require("express").Router();
  setRouter(router, app, "plant");
};

function setRouter(router, app, title) {
  const controller = require(`../../controllers/farm/${title}.controller.js`);
  router.get("/", controller.index);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);
  app.use(`/api/farm/${title}`, router);
}
