const { Schema,model } = require('mongoose');

const UserSchema = new Schema({
    name:{ type: String, trim: true, required: true},
    type: { type: String, trim: true,required: true, enum: ['seller','customer']}
});

const User = model('User',UserSchema);

module.exports = { User };