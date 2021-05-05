const express = require("express")
const router = express.Router()
const peopleController = require("../controllers/people")
const userController = require("../controllers/user")
const passport = require('../auth/auth')

router.post("/saveperson", passport.auth, peopleController.savePerson)
router.get("/people", peopleController.getPeople)
// router.get("/peopledate", peopleController.getPeopleDate)
router.get("/person/:ident", peopleController.getPerson)
router.put("/person/:id", passport.auth, peopleController.updatePerson)
router.delete("/person/:id", passport.auth, peopleController.deletePerson)

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/user", passport.auth, userController.userDetail) // Este auth viene de la línea 8 de auth.js


module.exports = router