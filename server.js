const express = require("express") //importing express
const serverDb = require("./serverDb") //importing the database connection function
const route = require("./routes/routes") // imports the route
const cookieParser = require("cookie-parser")

require("dotenv").config()
serverDb.connectToMongodb() //connecting to mongodb

const app = express() //requiring the express app
const port = 3000 || process.env.port

app.use(express.json()) //requiring JSON middleware
app.use(express.static('public')); //access to public folder
app.use(express.urlencoded({extended: false})) //Accessing forms in the req variable
app.use(cookieParser())
app.set("view engine", "ejs") // setting view engine
app.set('views', 'views'); // setting views folder


app.get("/", (req, res) => {
  res.render("home")
})
app.use("/rab", route)


// Server listener 
app.listen(port, ()=>{
  console.log(`Server is running at http://localhost:${port}`)
})