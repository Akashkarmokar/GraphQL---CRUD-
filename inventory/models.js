/**
 * Imported Modules
 */

const { Schema, model } = require('mongoose');

// Inventory Schema 
const InventorySchema = new Schema({
    product_id: { 
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    qty: { type: Number, required: true }
},{ timestamps: true });


const Inventory = model('Inventory',InventorySchema);
module.exports = Inventory;