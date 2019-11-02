const validate = req => {
  let validationMessage = [];
  if (!req.body.name) {
    validationMessage.push("Tag name cannot be empty");
  }

  return validationMessage;
};

module.exports = validate;
