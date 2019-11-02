const Kard = require("./model");

const validate = require("./validate");

exports.create = (req, res) => {
  // Validate request
  const validationMessage = validate(req);
  if (validationMessage.length > 0) {
    return res.status(400).send({
      message: validationMessage.join("\n")
    });
  }

  const kard = new Kard({
    star: req.body.star,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags || []
  });

  kard
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Kard."
      });
    });
};

exports.findAll = (req, res) => {
  Kard.find()
    .then(kards => {
      res.send(kards);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving kards."
      });
    });
};

exports.findOne = (req, res) => {
  Kard.findById(req.params.id)
    .then(kard => {
      if (!kard) {
        return res.status(404).send({
          message: `Note not found with id ${req.params.id}`
        });
      }
      res.send(kard);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Kard not found with id ${req.params.id}`
        });
      }
      return res.status(500).send({
        message: `Error retrieving kard with id ${req.params.id}`
      });
    });
};

exports.update = (req, res) => {
  console.log(`update kard ${req.params.id}`);
  // Validate request
  const validationMessage = validate(req, res);
  if (validationMessage.length > 0) {
    return res.status(400).send({
      message: validationMessage
    });
  }

  Kard.findByIdAndUpdate(
    req.params.id,
    {
      star: req.body.star,
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags || []
    },
    { new: true }
  )
    .then(kard => {
      if (!kard) {
        return res.status(404).send({
          message: `Kard not found with id ${req.params.id}`
        });
      }
      res.send(kard);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Kard not found with id ${req.params.id}`
        });
      }
      return res.status(500).send({
        message: `Error updating kard with id ${req.params.id}`
      });
    });
};

exports.delete = (req, res) => {
  Kard.findByIdAndRemove(req.params.id)
    .then(kard => {
      if (!kard) {
        return res.status(404).send({
          message: `Kard not found with id ${req.params.id}`
        });
      }
      res.send({ message: "Kard deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: `Kard not found with id ${req.params.id}`
        });
      }
      return res.status(500).send({
        message: `Could not delete kard with id ${req.params.id}`
      });
    });
};

exports.setStar = star => (req, res) => {
  Kard.findByIdAndUpdate(
    req.params.id,
    {
      star
    },
    { new: true }
  )
    .then(kard => {
      if (!kard) {
        return res.status(404).send({
          message: `Kard not found with id ${req.params.id}`
        });
      }
      res.send(kard);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Kard not found with id ${req.params.id}`
        });
      }
      return res.status(500).send({
        message: `Error updating kard with id ${req.params.id}`
      });
    });
};
