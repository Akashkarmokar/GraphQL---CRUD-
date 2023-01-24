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
    product_remaining_qty: { type: Number,default: 0, required: true },
    is_archive_or_delete:{ type: String,default:'ok', enum:['ok','deleted','archived']}
},{timestamps: true});



const Product = model('Product',ProductSchema);

module.exports = Product;