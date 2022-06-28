const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLList } = graphql;
const TechnologyType = require("./technology_type");
const Technology = require("../../models/technology");
const OfferType = require("./offer_type");
const Offer = require("../../models/offer");
const ApplicationType = require("./application_type");
const Application = require("../../models/application");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    offers: {
      type: new GraphQLList(OfferType),
      resolve() {
        return Offer.find({});
      },
    },
    offer: {
      type: OfferType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Offer.findById(id);
      },
    },
    applications: {
      type: new GraphQLList(ApplicationType),
      args: { offer: { type: GraphQLID } },
      resolve(parentValue, { offer }) {
        return Application.find({ offer });
      },
    },
    application: {
      type: ApplicationType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Application.findById(id);
      },
    },
    technologies: {
      type: new GraphQLList(TechnologyType),
      resolve() {
        return Technology.find({});
      },
    },
    technology: {
      type: TechnologyType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Technology.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
