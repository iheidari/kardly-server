const validate = req => {
  let validationMessage = [];

  if (!req.body.title) {
    validationMessage.push("Kard title cannot be empty");
  }

  return validationMessage;
};

module.exports = validate;
