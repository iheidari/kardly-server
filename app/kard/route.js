const db = require("./model");
const Kard = require("./model");

const middleWare = fnc => (request, response) => {
  const entity = new Kard();
  return fnc(db, entity, request, response);
};

module.exports = app => {
  const kardController = require("./controller");

  app.post("/kard", middleWare(kardController.create));

  app.get("/kard", middleWare(kardController.findAll));

  app.get("/kard/:id", middleWare(kardController.findOne));

  app.put("/kard/:id", middleWare(kardController.update));

  app.delete("/kard/:id", middleWare(kardController.delete));

  app.post("/kard/add-star/:id", middleWare(kardController.setStar(true)));
  app.post("/kard/remove-star/:id", middleWare(kardController.setStar(false)));
};
