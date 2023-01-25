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
        get_products: ProductController.get_products,
        get_sellers: UserController.get_sellers,
        get_customers: UserController.get_customers,
        best_selling_product: ProductController.best_selling_product,
    },
    Mutation:{
        create_user: UserController.create_user,
        change_user_status: UserController.change_user_status,

        create_product: ProductController.create_product,
        change_product_status: ProductController.change_product_status,

        create_order: OrderController.create_order,
        take_order_by_seller: OrderController.take_order_by_seller,
    }
};

/**
 * Exported modules
 */
module.exports = resolvers;