const graphql = require("graphql");
const Offer = require("../../models/offer");
const ApplicationType = require("./application_type");
const TechnologyType = require("./technology_type");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } = graphql;

const OfferType = new GraphQLObjectType({
  name: "Offer",
  fields: {
    id: { type: GraphQLID },
    companyName: { type: GraphQLString },
    positionName: { type: GraphQLString },
    technologies: {
      type: new GraphQLList(TechnologyType),
      resolve(parentValue) {
        return Offer.findTechnologies(parentValue.id);
      },
    },
    salary: { type: GraphQLInt },
    applications: {
      type: new GraphQLList(ApplicationType),
      resolve(parentValue) {
        return Offer.findApplications(parentValue.id);
      },
    },
  },
});

module.exports = OfferType;
