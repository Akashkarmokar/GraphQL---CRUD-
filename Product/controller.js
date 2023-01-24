/**
 * Imported Modules
 */
const Product = require('./model');
const { ApolloError } = require('apollo-server-express');

// Module Scaffold
const scaffold = {}


// Query
scaffold.get_products = async (parent,args,context,info)=>{
    return Product.find();
}
scaffold.get_product = async(parent,arags,context,info) =>{
    
}


// Mutators
scaffold.create_product = async()=>{}

/**
 * Export Module
 */
module.exports = scaffold;
