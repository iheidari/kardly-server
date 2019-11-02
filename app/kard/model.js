const mongoose = require("mongoose");

const KardSchema = mongoose.Schema(
  {
    star: Boolean,
    title: String,
    description: String,
    tags: [String]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Kard", KardSchema);
