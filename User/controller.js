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

scaffold.get_user = async (parent, args, contextValue, info)=>{
    const name = args.name;
    try{
        const fetchUsers = await User.find( {name: new RegExp(name, 'i')});
        return fetchUsers;
    }catch(err){
        throw new ApolloError(err);
    }
}


// Mutators
scaffold.create_user = async (parent,args,context)=>{
    try{
        const { name, type,balance=0 } = args.user; 
        // For seller type  user we take default balance = 0 , since seller type don't need balance
        const newUser = new User({
            name: name,
            type: type,
            balance: balance
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
