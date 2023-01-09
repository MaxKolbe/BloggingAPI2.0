const express = require("express")
const controller = require("../controllers/controller")
const {authenticateToken} = require("../middleware/auth")
const router = express.Router()

router.get("/login", controller.login_get)
router.post("/login", controller.login_post)
router.get("/signup", controller.signup_get)
router.post("/signup", controller.signup_post)
router.get("/articles", authenticateToken, controller.show_articles)
router.get("/new", authenticateToken, controller.show_newArticles)
router.post("/new", authenticateToken, controller.create_newArticles)
router.get("/articles/:id", authenticateToken, controller.show_oneArticle)
router.get("/edit/:id", authenticateToken, controller.get_editForm)

module.exports = router