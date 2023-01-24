/**
 * Imported Modules
 */
const {Schema, model } = require('mongoose');


// Order Schema 

const OrderSchema = new Schema({
    prdouct_id: {
        type: Schema.Types.ObjectId,
        ref:"Product",
        required: true,
    },
    buyer_id: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    seller_id: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    quantity: { type: Number, required: true }
    
},{ timestamps: true });



const Order = model('Order',OrderSchema);

module.exports = Order;
