const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { account } = require("../models");
const models = require("../models");

const validate = [
  body("accountName")
  .isString()
  .withMessage("account name should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("account name should be between 1 to 255 chars"),
  body("accountNumber")
  .isString()
  .withMessage("account number should be a valid account number")
]


//route to list accounts
router.get("/list", async function(req, res){
  console.log("user-agent", req.headers["user-agent"])
  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await account.findAll()
    .catch(err => {
      success = false
      message = "list fail"
      status = 500
      console.log(err.message)
    })

    res.status(status).json({
      success,
      message,
      data
    })
    
  } catch (err) {
    success = false
    message = "list fail"
    status = 500

    res.status(status).json({
      success,
      message
    })
    console.log(err)
  }
})


//route to add an account
router.post("/add", validate, async function(req, res) {

  try {

    var success = true
    var message = "add success"
    var status = 200
    var validationError = null
    var transaction = null
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      message = "add fail"
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
        accountName,
        accountNumber,
        description,
        openingBalance
      } = await req.body
      transaction = await models.sequelize.transaction()
      await account.create({ 
        accountName,
        accountNumber,
        description,
        openingBalance
      },
      {
        transaction
      }).catch(err => {
        message = "add fail"
        status = 500
        success = false
        console.log(chalk.red.bold("im from first inner catch",err.message))
      })
      if(!success){
        await transaction.rollback()
      }else {
        await transaction.commit()
      }
    }
  }catch (err) {
    success = false
    message = "add fail"
    status = 400
    console.log(err);
  };
  res.status(status).json({
    success,
    message,
    validationError
  })
});


//route to update an account
router.patch("/edit/:id", validate, async function(req, res){

  try {

    var success = true
    var message = "edit success"
    var status = 200
    var validationError = null
    var transaction = null
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      message = "edit fail"
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
      const id = req.params.id
      const { 
        accountName,
        accountNumber,
        description,
        openingBalance
      } = await req.body
      transaction = await models.sequelize.transaction()
      await account.update({ 
        accountName,
        accountNumber,
        description,
        openingBalance
      },
      {
        where: { id }
      },
      {
        transaction
      }).catch(err => {
        message = "edit fail"
        status = 500
        success = false
        console.log(chalk.red.bold("im from first inner catch",err.message))
      })
      if(!success) {
        await transaction.rollback()
      }else {
        await transaction.commit()
      }
    }
  }catch (err) {
    success = false
    message = "edit fail"
    status = 400
    console.log(err);
  };
  res.status(status).json({
    success,
    message,
    validationError
  })
});


//route to delete an account
router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id
    await account.destroy({ 
      where: { id }
    }).catch(err => {
      success = false
      message = "delete fail"
      status = 500 
      console.log(err.message)
    })

  } catch (err) {
    success = false
    message = "delete fail"
    status = 400
    console.log(err)
  }

  res.status(status).json({
    success,
    message
  })
})

module.exports = router;