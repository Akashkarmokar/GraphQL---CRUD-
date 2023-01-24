/**
 * Imported Modules
 */
const { ApolloError } = require('apollo-server-express');
const UserController = require('./User/controller');
const ProductController = require('./Product/controller');



// Resolvers
const resolvers = {
    Query:{
        hello: ()=>{
            return 'Hello World';
        },
        get_users: UserController.get_users
    },
    Mutation:{
        create_user: UserController.create_user,
        create_product: ProductController.create_product,
    }
};

/**
 * Exported modules
 */
module.exports = resolvers;