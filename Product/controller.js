/**
 * Imported Modules
 */
const Product = require('./model');
const { ApolloError } = require('apollo-server-express');
const Order = require('../order/model');

// Module Scaffold
const scaffold = {}


// Query
scaffold.get_products = async (parent,args,context,info)=>{
    return Product.find();
}
scaffold.get_product = async(parent,arags,context,info) =>{
    
}

scaffold.best_selling_product = async (parent,args,context,info)=>{
    const bestSellProduct = await Order.aggregate([
        {
            $group: {
                _id: "$product_id",
                total_selling_count: { $sum: 1 }
            }
        },
        {
            $sort:{
                total_selling_count: -1
            }
        },
        {
            $limit: 1
        },
        {
            $lookup:
              {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product_details"
              }
         },
         {
            $unwind: "$product_details"
         }
    ]);
    let finalResponse = bestSellProduct[0];
    return bestSellProduct[0];
}


// Mutators
scaffold.create_product = async(parent,args,context,info)=>{
    const { product_name, product_qty, product_buying_price, product_selling_price} = args.product;
    try{
        const newProduct = new Product({
            product_name,
            product_qty,
            product_buying_price,
            product_selling_price,
            product_remaining_qty: product_qty
        });
        await newProduct.save();
        return newProduct;
    }catch(e){
        throw new ApolloError(e);
    }
    

}

scaffold.change_product_status = async (parent,args,context,info)=>{
    let { product_id , status } = args.statusDetails;
    try {
        let updateData = await Product.findOneAndUpdate(
            { _id: product_id },
            { is_archive_or_delete: status },
            { new: true }
        )
        return updateData;
    } catch (error) {
        throw new ApolloError(error)
    }
}

/**
 * Export Module
 */
module.exports = scaffold;
