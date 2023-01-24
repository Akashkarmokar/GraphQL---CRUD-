const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type User {
        id: ID
        name: String
        type: String
    }

    input UserInput {
        name: String
        type: String
    }

    type Query {
        hello: String

        get_users: [User]
    }

    type Mutation {
        create_user(user: UserInput): User
    }

`;

module.exports = typeDefs;