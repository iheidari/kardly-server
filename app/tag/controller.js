const Tag = require("./model");

const validate = require("./validate");

exports.create = (req, res) => {
  // Validate request
  const validationMessage = validate(req);
  if (validationMessage.length > 0) {
    return res.status(400).send({
      message: validationMessage.join("\n")
    });
  }

  const tag = new Tag({
    name: req.body.name
  });

  tag
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the tag."
      });
    });
};

exports.findAll = (req, res) => {
  const q = req.query.q;
  const name = req.query.name;

  let searchCriteria = {};
  if (name) {
    searchCriteria = { name: new RegExp("^" + name + "$", "i") };
  } else if (q) {
    searchCriteria = { name: new RegExp("^" + q, "i") };
  }

  Tag.find(searchCriteria)
    .then(tags => {
      res.send(tags);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tags."
      });
    });
};

exports.findOne = (req, res) => {
  Tag.findById(req.params.id)
    .then(tag => {
      if (!tag) {
        return res.status(404).send({
          message: `Note not found with id ${req.params.id}`
        });
      }
      res.send(tag);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Tag not found with id ${req.params.id}`
        });
      }
      return res.status(500).send({
        message: `Error retrieving tag with id ${req.params.id}`
      });
    });
};

exports.update = (req, res) => {
  console.log(`update tag ${req.params.id}`);
  // Validate request
  const validationMessage = validate(req, res);
  if (validationMessage.length > 0) {
    return res.status(400).send({
      message: validationMessage
    });
  }

  Tag.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  )
    .then(tag => {
      if (!tag) {
        return res.status(404).send({
          message: `Tag not found with id ${req.params.id}`
        });
      }
      res.send(tag);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Tag not found with id ${req.params.id}`
        });
      }
      return res.status(500).send({
        message: `Error updating tag with id ${req.params.id}`
      });
    });
};

exports.delete = (req, res) => {
  Tag.findByIdAndRemove(req.params.id)
    .then(tag => {
      if (!tag) {
        return res.status(404).send({
          message: `Tag not found with id ${req.params.id}`
        });
      }
      res.send({ message: "Tag deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: `Tag not found with id ${req.params.id}`
        });
      }
      return res.status(500).send({
        message: `Could not delete tag with id ${req.params.id}`
      });
    });
};
