/**
 * Imported Modules
 */
const Order = require('./model');
const Product = require('../Product/model');
const Inventory = require('../inventory/models')
const { ApolloError } = require('apollo-server-express');
const mongoose = require('mongoose');

// Module Scaffold
const scaffold = {}


// Query



// Mutators
scaffold.create_order = async(parent,args,context,info)=>{
    let { product_id,buyer_id,qty } = args.order ;
    try{
        const product_details = await Product.findById(product_id);
        if( product_details.product_qty >= qty & qty > 0 ){
            /**
             * Now for simplycity I don't use ACID transaction .
             * Though ACID transaction is must required for this kind of operation 
             */
            let total_price = qty * product_details.product_selling_price;

            const newOrder = new Order({ 
                product_id,
                buyer_id,
                quantity:qty,
                total_price,
                product_unit_price: product_details.product_selling_price 
            });
            await newOrder.save();
            return newOrder;
        }else{
            throw new ApolloError("Unable to order right now")
        }
    }catch(e){
        throw new ApolloError(e);
    }
}

scaffold.take_order_by_seller = async (parent,args,context,info)=>{
    const { product_id, order_id, seller_id,quantity } = args.takenOrderDetails;

    try {
        const [product_details, order_details] = await Promise.all([
            Product.findById(product_id),
            Order.findById(order_id)
        ]);
        if(product_details.product_qty >= order_details.quantity){
            /**
             * Now for simplycity I don't use ACID transaction .
             * Though ACID transaction is must required for this kind of operation 
             */
            const addToInventory = await new Inventory({
                product_id,
                order_id,
                quantity
            }).save();
            
            // Decrease the remaining quantity
            await Product.updateOne(
                {_id: product_id},
                { $inc:{ product_remaining_qty: (-1) * quantity}}
            )
            await Order.updateOne(
                { _id: order_id},
                {
                    status: 'delivered'
                }
            )
            return addToInventory;
        }else{
            throw new ApolloError("Unable to purchase this product right now");
        }
    } catch (error) {
        throw new ApolloError(error);
    }
}

/**
 * Export Module
 */
module.exports = scaffold;
