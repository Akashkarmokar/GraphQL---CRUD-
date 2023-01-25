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

scaffold.get_sellers = async (parent,args,context)=>{
    try{
        const allSellers  = await User.find({type: 'seller'});
        console.log(allSellers);
        return allSellers;
    }catch(err){
        throw new ApolloError(err)
    }
}


scaffold.get_customers = async (parent,args,context)=>{
    try{
        const allSellers  = await User.find({type: 'buyer'});
        console.log(allSellers);
        return allSellers;
    }catch(err){
        throw new ApolloError(err)
    }
}

scaffold.change_user_status = async (parent,args,context)=>{
    try {
        const { user_id, status } = args.statusDetails;
        const updateData = await User.findOneAndUpdate(
            { _id: user_id },
            { is_archive_or_delete: status },
            { new: true }
        )
        console.log(updateData);
        return updateData;
    } catch (error) {
        throw new ApolloError(err);
    }
}
/**
 * Export Module
 */
module.exports = scaffold;
