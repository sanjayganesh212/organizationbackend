
const mongoose = require('mongoose');

let dbstring = process.env.mongodbConnectivityString || 'mongodb://localhost:27017/sampledb' ; 

async function connectToDatabase() {
         try {

           await mongoose.connect(dbstring, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });

           console.log('Server Connected to the database using Mongoose ORM ');

       

         } catch (error) {

           console.error('Error connecting to the database:', error);

         }
       }
       
connectToDatabase();

mongoose.connection.on('open', () => console.log('db open'));
mongoose.connection.on('disconnected', () => console.log('db disconnected'));
mongoose.connection.on('reconnected', () => console.log('db trying to reconnected'));
mongoose.connection.on('disconnecting', () => console.log('db disconnecting'));
mongoose.connection.on('close', () => console.log(' db is close'));