const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator")
const { user } = require("../models");
const jwt = require("jsonwebtoken")

const validate = [
  body("username")
  .isEmail()
  .withMessage("username should be a valid email"),
  body("password")
  .isLength({ min: 8 })
  .withMessage("password should be atleast 8 chars")
]

router.post("/register", validate, async function(req, res){

  try {
    var success = true
    var message = "user registration successful"
    var status = 200
    var validationError = null
    var token = ""
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      message = "registration failed"
      status = 400
      success = false
      validationError = []
      errors.array().forEach(val => {
        validationError.push({
          param: val.param,
          message: val.msg
        })
      })
    }else {

      const {
        username,
        password,
        retypePassword,
        roleId,
        name
      } = req.body

      console.log(req.body)
      const isEmailExist = await user.findOne({ where: { username } })

      if(!isEmailExist) {

        if(password === retypePassword ) {

          const salt = await bcrypt.genSalt(10)
          const encodedPass = await bcrypt.hash(password, salt)
          
          await user.create({
            username,
            password: encodedPass,
            roleId,
            name
          }).catch(err => {
            success = false
            message = "user registration failed"
            status = 500
            console.log(err.message)
          })
          if(success) {
            token = jwt.sign({user}, process.env.API_SECRET)
          }
        }else {
          message = "passwords donot match"
          status = 400
          success = false
        }
      }else {
        message = "email already registered"
        status = 400
        success = false
      }
    }
  } catch (err) {
    success = false
    message = "user registration failed"
    status = 500
    console.log(err)
  }
  res.status(status).json({
    success,
    message,
    token
  });
});


router.post("/login", validate, async function(req, res) {

  try {

    var success = true
    var message = "login successful"
    var status = 200
    var validationError = null
    var token = ""
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      message = "login failed"
      status = 400
      success = false
      validationError = []
      errors.array().forEach(val => {
        validationError.push({
          param: val.param,
          message: val.msg
        })
      })
    }else {

      const {
        username,
        password
      } = await req.body

      const User = await user.findOne({
        where: {
          username
        }
      }).catch(err => {
        message = "login failed"
        status = 500
        success = false
        console.log(chalk.red.bold(err.message))
        console.log(chalk.red.bold(err.stack))
      })
      if(User){
        const ismatch = await bcrypt.compare(password, User.password)
        if(ismatch) {
          token = await jwt.sign({User}, process.env.API_SECRET)
        }else {
          success = false
          status = 401
          message = "password didnot match"
        }
      }else {
        message = "user doesnot exist"
        status = 401
        success = false
      }
    }
  }catch (err) {
    success = false
    message = "login failed"
    status = 400
    console.log(err)
  }
  res.status(status).json({
    success,
    message,
    validationError,
    token
  })
})

module.exports = router
