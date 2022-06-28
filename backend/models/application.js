const { Schema, models, model } = require("mongoose");

const applicationSchema = new Schema({
  offer: { type: Schema.Types.ObjectId, ref: "Offer" },
  name: { type: String },
  technologies: [{ type: Schema.Types.ObjectId, ref: "Technology" }],
  salary: { type: Number },
  email: { type: String },
});

applicationSchema.statics.findTechnologies = function (id) {
  return this.findById(id)
    .populate("technologies")
    .then((application) => application.technologies);
};

const Application = models.Application || model("Application", applicationSchema);
module.exports = Application;
