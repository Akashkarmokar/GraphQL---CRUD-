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
scaffold.create_product = async(parent,args,context,info)=>{
    const { product_name, product_qty, product_buying_price, product_selling_price} = args.product;
    try{
        const newProduct = new Product({
            product_name,
            product_qty,
            product_buying_price,
            product_selling_price
        });
        await newProduct.save();
        return newProduct;
    }catch(e){
        throw new ApolloError(e);
    }
    

}

/**
 * Export Module
 */
module.exports = scaffold;
