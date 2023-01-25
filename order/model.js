/**
 * Imported Modules
 */
const {Schema, model } = require('mongoose');


// Order Schema 

const OrderSchema = new Schema({
    product_id: {
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
    },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true},
    product_unit_price: { type: Number, required: true },
    status: { type: String, default: 'not_delivered', enum:['not_delivered','delivered']}
    
},{ timestamps: true });



const Order = model('Order',OrderSchema);

module.exports = Order;
