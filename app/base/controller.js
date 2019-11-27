exports.create = async (db, entity, req, res) => {
  try {
    const toCreateEntity = { ...req.body };
    Object.assign(entity, toCreateEntity);
    //const newEntity = { ...entity, ...toCreateEntity };

    const validationError = entity.validateSync();
    if (validationError) {
      return res.status(400).send(validationError);
    }
    result = await entity.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while creating the entity."
    });
  }
};

exports.findAll = async (db, entity, req, res) => {
  try {
    const entities = await db.find();
    res.send(entities);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving entities."
    });
  }
};

exports.findOne = async (db, entity, req, res) => {
  try {
    const { id } = req.params;
    const findedEntity = await db.findById(id);
    if (!findedEntity) {
      return res.status(404).send({
        message: `Entity not found with id ${id}`
      });
    }
    res.send(findedEntity);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: `Entity not found with id ${id}`
      });
    }
    return res.status(500).send({
      message: `Error retrieving entity with id ${id}`
    });
  }
};

exports.update = async (db, entity, req, res) => {
  try {
    const { id } = req.params;
    const toUpdateEntity = { ...req.body };
    Object.assign(entity, toUpdateEntity);

    const validationError = entity.validateSync();
    if (validationError) {
      return res.status(400).send(validationError);
    }

    const updatedEntity = await db.findByIdAndUpdate(id, toUpdateEntity, {
      new: false
    });
    if (!updatedEntity) {
      return res.status(404).send({
        message: `Entity not found with id ${id}`
      });
    }
    res.send(updatedEntity);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: `Entity not found with id ${id}`
      });
    }
    return res.status(500).send({
      message: `Error updating entity with id ${id}`
    });
  }
};

exports.delete = async (db, entity, req, res) => {
  try {
    const { id } = req.params;
    const deletedEntity = await db.findByIdAndRemove(id);
    if (!deletedEntity) {
      return res.status(404).send({
        message: `Entity not found with id ${id}`
      });
    }
    res.send({ message: "Entity deleted successfully!" });
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: `Entity not found with id ${id}`
      });
    }
    return res.status(500).send({
      message: `Could not delete entity with id ${id}`
    });
  }
};
