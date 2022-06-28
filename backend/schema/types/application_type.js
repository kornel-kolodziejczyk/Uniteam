const graphql = require("graphql");
const Application = require("../../models/application");
const TechnologyType = require("./technology_type");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } = graphql;

const ApplicationType = new GraphQLObjectType({
  name: "Application",
  fields: () => ({
    id: { type: GraphQLID },
    offer: { type: GraphQLID },
    name: { type: GraphQLString },
    technologies: {
      type: new GraphQLList(TechnologyType),
      resolve(parentValue) {
        return Application.findTechnologies(parentValue.id);
      },
    },
    salary: { type: GraphQLInt },
    email: { type: GraphQLString },
  }),
});

module.exports = ApplicationType;
