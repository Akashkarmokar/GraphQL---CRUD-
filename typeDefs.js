const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type User {
        id: ID
        name: String
        type: String
        balance: Int
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

    type Order {
        id: ID
        product_id: ID
        buyer_id: ID
        seller_id: ID
        quantity: Int
        total_price: Int
        product_unit_price: Int
        status: String
    }

    type Inventory{
        product_id: ID
        order_id: ID
        quantity: Int
    }

    input UserInput {
        name: String
        type: String
        balance: Int
    }

    input ProductInput{
        product_name: String
        product_qty: Int
        product_buying_price: Int
        product_selling_price: Int
    }

    input OrderInput {
        product_id: ID
        buyer_id: ID
        qty: Int
    }

    input TakenOrderInput {
        product_id: ID
        order_id: ID
        seller_id: ID
        quantity: Int
    } 

    type Query {
        get_users: [User]
        get_user(name:String): [User]
        get_products: [Product]
    }

    type Mutation {
        create_user(user: UserInput): User
        create_product(product: ProductInput): Product
        create_order(order: OrderInput): Order 
        take_order_by_seller(takenOrderDetails: TakenOrderInput): Inventory
    }

`;

module.exports = typeDefs;