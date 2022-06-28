const graphql = require("graphql");
const Application = require("../models/application");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const Offer = require("../models/offer");
const ApplicationType = require("./types/application_type");
const OfferType = require("./types/offer_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOffer: {
      type: OfferType,
      args: {
        companyName: { type: GraphQLNonNull(GraphQLString) },
        positionName: { type: GraphQLNonNull(GraphQLString) },
        salary: { type: GraphQLNonNull(GraphQLInt) },
        technologies: { type: new GraphQLList(GraphQLID) },
      },
      resolve(parentValue, { companyName, positionName, salary, technologies }) {
        return new Offer({ companyName, positionName, salary, technologies }).save();
      },
    },

    deleteOffer: {
      type: OfferType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return Offer.findByIdAndDelete(id);
      },
    },

    editOffer: {
      type: OfferType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        companyName: { type: GraphQLString },
        positionName: { type: GraphQLString },
        salary: { type: GraphQLInt },
        technologies: { type: new GraphQLList(GraphQLID) },
      },
      resolve(parentValue, args) {
        return Offer.findByIdAndUpdate(args.id, args, { new: true });
      },
    },

    addApplication: {
      type: OfferType,
      args: {
        offer: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        technologies: { type: new GraphQLList(GraphQLID) },
        salary: { type: GraphQLNonNull(GraphQLInt) },
        email: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { offer, name, technologies, salary, email }) {
        return Offer.addApplication(offer, name, technologies, salary, email);
      },
    },

    deleteApplication: {
      type: OfferType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        offer: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id, offer }) {
        return Offer.deleteApplication(id, offer);
      },
    },
    editApplication: {
      type: ApplicationType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        technologies: { type: new GraphQLList(GraphQLID) },
        salary: { type: GraphQLInt },
        email: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return Application.findByIdAndUpdate(args.id, args, { new: true });
      },
    },
  },
});

module.exports = mutation;
