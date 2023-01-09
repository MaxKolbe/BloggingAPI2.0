const express = require("express") //importing express
const serverDb = require("./serverDb") //importing the database connection function
const route = require("./routes/routes") // imports the route
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override")

require("dotenv").config()
serverDb.connectToMongodb() //connecting to mongodb

const app = express() //requiring the express app
const PORT = 3000 || process.env.PORT

app.use(express.json()) //requiring JSON middleware
app.use(express.static('public')); //access to public folder
app.use(express.urlencoded({extended: false})) //Accessing forms in the req variable
app.use(cookieParser())
app.use(methodOverride("_method"))
app.set("view engine", "ejs") // setting view engine
app.set('views', 'views'); // setting views folder


app.get("/", (req, res) => {
  res.render("home")
})
app.use("/rab", route)


// Server listener 
app.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})
