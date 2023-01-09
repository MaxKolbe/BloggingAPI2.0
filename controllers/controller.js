const userModel = require("../models/userModel")
const articleModel = require("../models/articleModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { authenticateToken } = require("../middleware/auth")

const age = 60 * 60 
const createJwt = (id)=>{
  return jwt.sign({id}, "myAccessTokenSecret", {expiresIn: age})
}

module.exports.signup_get = (req, res)=>{
  res.render("register")
}
module.exports.login_get = (req, res)=>{
  res.render("login")
}
module.exports.signup_post = async (req, res)=>{
  const {email, firstname, lastname, password} = req.body
  try{
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({email, firstname, lastname, password: hashedPassword})
    const token = createJwt(user._id)
    res.cookie("jwt", token, {httpOnly: true})
    console.log(user._id)
    res.redirect("/rab/articles")
  }catch(err){
    console.log(err)
    res.status(400).redirect("/rab/signup")
  }
}
module.exports.login_post = async (req, res)=>{
  const {email, password} = req.body
  try{
    const user = await userModel.findOne({email})
    if(user){
      if(await bcrypt.compare(password, user.password)){
        const token = createJwt(user._id)
        res.cookie("jwt", token, {httpOnly: true})
        console.log(user._id)
        res.redirect("/rab/articles")
      }else{
        res.redirect("/rab/login")
      }
    }else{
      res.redirect('/rab/login')
    }
  }catch(err){
    console.log(err)
    res.status(400).redirect("/rab/login")
  }
}
module.exports.show_articles = async (req, res)=>{
  const articles = await articleModel.find().limit(3)
  const token = req.cookies.jwt
  const decoded = jwt.verify(token, "myAccessTokenSecret")
  const user = userModel.findById(decoded.id)
  res.render("articles", {articles: articles, user: user})
}
module.exports.show_newArticles = (req, res)=>{
  res.render("newArticle")
}
module.exports.create_newArticles= async (req, res)=>{
  const {title, description, body, tags} = req.body
  const token = req.cookies.jwt
  const decoded = jwt.verify(token, "myAccessTokenSecret")
  const user = userModel.findById(decoded.id)
    try{
      await articleModel.create({
        title,
        author: user.firstname,
        description,
        body,
        tags,
        timestamp: new Date(),
        read_count: 1,
        state: "Draft"
      })
      res.redirect("/rab/articles")
    }catch(err){
      res.redirect("/rab/new")
    }
}
