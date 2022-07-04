const express = require("express")
const router = express.Router()

const db = require("../models/db.js")
const userController = require("../controllers/userController.js")


// user registration
router.post("/pregister", (req, res) => {
	userController.registerUser(req.body).then(result => res.send(result));
})

// user login
router.post("/plogin", (req, res) => {
	userController.userLogin(req,res).then(result => res.send(result));
})	

router.post("/userCheck", (req, res)=>{
	userController.userCheck(req.body).then(result => res.send(result));
})


module.exports = router;
