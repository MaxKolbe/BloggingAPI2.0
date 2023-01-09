const mongoose = require("mongoose")
require("dotenv").config()

const connectionURI = process.env.URI

mongoose.set('strictQuery', false);

function connectToMongodb(){
  mongoose.connect(connectionURI)

  mongoose.connection.on("connect", ()=>{
    console.log(`Connected to Mongodb successfully`)
  })

  mongoose.connection.on("error", (err)=>{
    console.log('There was an error in connecting')
  })
}

module.exports = { connectToMongodb } 

