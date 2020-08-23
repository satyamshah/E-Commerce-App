const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);       //exporting so it can be used as reference for other schema
