const baseControl = require("../base/controller");

const setStar = star => async (Model, entity, req, res) => {
  try {
    const { id } = entity;
    const kard = await Model.findByIdAndUpdate(
      id,
      {
        star
      },
      { new: true }
    );
    if (!kard) {
      return res.status(404).send({
        message: `Kard not found with id ${id}`
      });
    }
    res.send(kard);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: `Kard not found with id ${id}`
      });
    }
    return res.status(500).send({
      message: `Error updating kard with id ${id}`
    });
  }
};

module.exports = { ...baseControl, setStar };
