const userModel = require("../models/userModel")
const articleModel = require("../models/articleModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const age = 60 * 60 
const createJwt = (id)=>{
  return jwt.sign({id}, process.env.secret, {expiresIn: age})
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
    const token = createJwt(user.id)
    res.cookie("jwt", token, {httpOnly: true})
    // console.log(user.id)
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
        const token = createJwt(user.id)
        res.cookie("jwt", token, {httpOnly: true})
        // console.log(user.id)
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
  const articles = await articleModel.find()
  res.render("articles", {articles: articles})
}
module.exports.show_newArticles = (req, res)=>{
  res.render("newArticle")
}
module.exports.create_newArticles= async (req, res)=>{
  const {title, description, body, tags} = req.body
  const token = req.cookies.jwt
  const decoded = jwt.verify(token, process.env.secret)
  const ids = decoded.id
  const user = await userModel.findById(ids)
  // console.log(user)
    try{
     const article =  await articleModel.create({
        title,
        author: user.firstname,
        description,
        body,
        tags,
        timestamp: new Date(),
        read_count: 1,
        state: "Draft"
      })
      res.redirect(`/rab/articles/${article.id}`)
    }catch(err){
      res.redirect("/rab/new")
    }
}
module.exports.show_oneArticle = async (req, res)=>{
  const id = req.params.id
  const article = await articleModel.findById(id)
  res.render("oneArticle", {article: article})
}
module.exports.get_editForm = async (req, res)=>{
  const article = await articleModel.findById(req.params.id)
  res.render("edit", {article: article})
}
module.exports.editForm = async (req, res)=>{
 const {title, description, body, tags} = req.body
 const article =  await articleModel.findByIdAndUpdate(req.params.id, {
    title, state: 'Published', description, body, tags, 
    timestamp: new Date(),
    read_count: 1,
  })
  res.redirect(`/rab/articles/${article.id}`)
}
module.exports.deleteArticle = async (req, res)=>{
  id = req.params.id
  await articleModel.findByIdAndDelete(id)
  res.redirect("/rab/articles")
}
module.exports.logout = async (req, res)=>{
  res.clearCookie("jwt")
  res.render("home")
}