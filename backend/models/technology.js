const { Schema, models, model } = require("mongoose");

const technologySchema = new Schema({
  name: { type: String },
});

const Technology = models.Technology || model("Technology", technologySchema);
module.exports = Technology;
