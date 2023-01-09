const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticateToken = (req, res, next)=>{
  const token = req.cookies.jwt
  if(token){
    jwt.verify(token, process.env.secret, (err, data)=>{
      if(err){
        console.log(err)
        res.redirect("/rab/login")
      }else{
        next()
      }  
    })
  }else{
    console.log("There was no token")
    res.redirect("/rab/login")
  }
}

module.exports = { authenticateToken }