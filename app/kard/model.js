const mongoose = require("mongoose");

const KardSchema = mongoose.Schema(
  {
    star: Boolean,
    title: { type: String, required: true },
    description: String,
    rate: { type: Number, max: 10 },
    tags: [String]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Kard", KardSchema);
