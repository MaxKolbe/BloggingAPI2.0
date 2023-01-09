const mongoose = require("mongoose")

const connectionURI = "mongodb://localhost:27017"

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

