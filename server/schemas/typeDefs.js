// This is using apollo server v4 and not v3. v3 depends on graphql-tag NPM package
const typeDefs = `#graphql
    type Query {
        text: String
    }

`;

export default typeDefs;