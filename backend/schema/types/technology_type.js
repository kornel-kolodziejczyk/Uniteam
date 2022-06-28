const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const TechnologyType = new GraphQLObjectType({
  name: "Technology",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

module.exports = TechnologyType;
