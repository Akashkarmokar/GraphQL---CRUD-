const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type User {
        id: ID
        name: String
        type: String
    }
    type Product{
        id: ID
        product_name: String
        product_qty: Int
        product_buying_price: Int
        product_selling_price: Int
        product_remaining_qty: Int
        is_archive_or_delete: String
    }

    input UserInput {
        name: String
        type: String
    }

    input ProductInput{
        product_name: String
        product_qty: Int
        product_buying_price: Int
        product_selling_price: Int
    }

    type Query {
        hello: String

        get_users: [User]

        get_products: [Product]
    }

    type Mutation {
        create_user(user: UserInput): User
        create_product(product: ProductInput): Product 
    }

`;

module.exports = typeDefs;