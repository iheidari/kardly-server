module.exports = app => {
  const kard = require("./controller");

  app.post("/kard", kard.create);

  app.get("/kard", kard.findAll);

  app.get("/kard/:id", kard.findOne);

  app.put("/kard/:id", kard.update);

  app.delete("/kard/:id", kard.delete);

  app.post("/kard/add-star/:id", kard.setStar(true));
  app.post("/kard/remove-star/:id", kard.setStar(false));
};
