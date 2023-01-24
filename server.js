const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');





async function startServer(){
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    });


    // Start Apollo Server 
    await apolloServer.start();

    // Apply Middleware
    apolloServer.applyMiddleware({ 
        app: app,
        path:'/my_graphQL' 
    });

    // For others route excluding graphQL
    app.use((req,res)=>{
        res.send('Hello from express apollo server');
    })

    // Database connection
    mongoose.set('strictQuery',false);
    await mongoose.connect('mongodb://localhost:27017/shop_owner');
    console.log('Mongoose Connected');


    // Listening to to server port
    app.listen(4000, ()=> {
        console.log('Server is listening on port 4000')
    })
}

startServer();