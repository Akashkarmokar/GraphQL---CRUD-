/**
 * Imported Module
 */
const {User} = require('./models');
const {ApolloError} = require('apollo-server-express')


/**
 * Module Scaffold
 */
const scaffold = {};



// Query

scaffold.get_users = async ()=>{
    return await User.find();
}

// Mutators
scaffold.create_user = async (parent,args,context)=>{
    try{
        const { name, type } = args.user;
        const newUser = new User({
            name: name,
            type: type,
        })
        await newUser.save();
        return newUser;
    }catch(err){
        throw new ApolloError(err);
    }
    
}

/**
 * Export Module
 */
module.exports = scaffold;
