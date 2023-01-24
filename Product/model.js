/**
 * Imported Modules
 */
const {Schema,model} = require('mongoose');



// Product Schema 
const ProductSchema = new Schema({
    product_name: { type: String, required: true, trim: true },
    product_qty: { type: Number, required: true},
    product_buying_price: { type: Number, required: true},
    product_selling_price: { type: Number, required: true},
})



const Product = model('Product',ProductSchema);