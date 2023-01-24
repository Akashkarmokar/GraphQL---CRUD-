/**
 * Imported Modules
 */
const { ApolloError } = require('apollo-server-express');
const UserController = require('./User/controller');
const ProductController = require('./Product/controller');
const OrderController = require('./order/controller');



// Resolvers
const resolvers = {
    Query:{
        get_users: UserController.get_users,
        get_user: UserController.get_user,
        get_products: ProductController.get_products
    },
    Mutation:{
        create_user: UserController.create_user,
        create_product: ProductController.create_product,
        create_order: OrderController.create_order,
        take_order_by_seller: OrderController.take_order_by_seller,
    }
};

/**
 * Exported modules
 */
module.exports = resolvers;