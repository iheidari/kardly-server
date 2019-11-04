module.exports = app => {
  const tag = require("./controller");

  app.post("/tag", tag.create);

  app.get("/tag", tag.findAll);

  app.get("/tag/:id", tag.findOne);

  app.put("/tag/:id", tag.update);

  app.delete("/tag/:id", tag.delete);

  app.get("/tag/findbyname/:name", tag.findByName);
};
