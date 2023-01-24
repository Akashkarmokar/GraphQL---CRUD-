const { Schema,model } = require('mongoose');

const UserSchema = new Schema({
    name:{ type: String, trim: true, required: true},
    type: { type: String, trim: true,required: true, enum: ['seller','buyer']},
    balance: { type: Number, default: 0, required: true },
    is_archive_or_delete:{ type: String,default:'ok', enum:['ok','deleted','archived']}
});

const User = model('User',UserSchema);

module.exports = { User };