const { Schema, models, model } = require("mongoose");
const Application = require("./application");

const offerSchema = new Schema({
  companyName: { type: String },
  positionName: { type: String },
  technologies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Technology",
    },
  ],
  salary: { type: Number },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

offerSchema.post("findOneAndDelete", async function (document) {
  await Application.deleteMany({ offer: document.id });
});

offerSchema.statics.findTechnologies = function (id) {
  return this.findById(id)
    .populate("technologies")
    .then((offer) => offer.technologies);
};

offerSchema.statics.findApplications = function (id) {
  return this.findById(id)
    .populate("applications")
    .then((offer) => offer.applications);
};

offerSchema.statics.addApplication = function (offer, name, technologies, salary, email) {
  return this.findById(offer).then((offer) => {
    const application = new Application({ offer, name, technologies, salary, email });
    offer.applications.push(application);
    return Promise.all([application.save(), offer.save()]).then(([application, offer]) => offer);
  });
};

offerSchema.statics.deleteApplication = function (id, offer) {
  return this.findById(offer).then((offer) => {
    const index = offer.applications.indexOf(id);
    offer.applications.splice(index, 1);
    return Promise.all([Application.findByIdAndDelete(id), offer.save()]).then(([application, offer]) => offer);
  });
};

const Offer = models.Offer || model("Offer", offerSchema);
module.exports = Offer;
