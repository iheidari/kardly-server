const mongoose = require("mongoose");

const TagSchema = mongoose.Schema(
  {
    name: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Tag", TagSchema);
