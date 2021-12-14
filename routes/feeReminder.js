const express = require("express");
const router = express.Router();
const { feeReminder } = require("../models");
const models = require("../models");
const chalk = require('chalk');
const { body, validationResult } = require("express-validator");

const validate = [
  body("days")
  .isNumeric()
  .withMessage("days should be a number"),
  body("message")
  .isString()
  .withMessage("message should be a string")
]


//route to list fee types
router.get("/list", async function(req, res){

  try {
    var message = "list success"
    var status = 200
    var success = true
    const data = await feeReminder.findAll()
    res.status(status).json({
      message,
      success,
      data
    })
  } catch (err) {
    message = "list fail"
    status = 400
    success = false
    res.status(status).json({
      message,
      success
    })
    console.log(chalk.red.bold(err.message));
  }
})


//route to add a fee type
router.post("/add", validate, async function(req, res){

  try {
    var message = "add success"
    var status = 200
    var success = true
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
      const { frequency, days, message, student, guardian } = await req.body
      transaction = await models.sequelize.transaction()
      await feeReminder.create({ frequency, days, message, student, guardian }, 
      {
        transaction
      }).catch(err => {
        message = "add fail"
        status = 400
        success = false
        console.log(err)
      })
      if(!success) {
        await transaction.rollback()
      }else {
        await transaction.commit()
      }
    }
  } catch (err) {
    message = "add fail"
    status = 400
    success = false
  }
  res.status(status).json({
    message,
    success,
    validationError
  })
})


//route to update a fee type
router.patch("/edit/:id", validate, async function(req, res){

  try {
    var message = "edit success"
    var status = 200
    var success = true
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
      const { frequency, days, message, notify } = await req.body
      transaction = await models.sequelize.transaction()
      await feeReminder.update({ frequency, days, message, notify },
      {
        where: { id }
      },
      { 
        transaction
      }).catch(err => {
        message = "edit fail"
        status = 400
        success = false
        console.log(err.messsage)
      })
      if(!success) {
        await transaction.rollback()
      }else {
        await transaction.commit()
      }
    }
  } catch (err) {
    message = "edit fail"
    status = 400
    success = false
    console.log(err.message)
  }
  res.status(status).json({
    message,
    success,
    validationError
  })
})


//route to delete a fee type
router.delete("/delete/:id", async function(req, res){
  
  try {
    var message = "delete success"
    var status = 200
    var success = true
    const id = req.params.id
    await feeReminder.destroy({ where: { id } })

  } catch (err) {
    message = "delete fail"
    success = false
    status = 400
    console.log(err)
  };
  res.status(status).json({
    message,
    success
  });
});

module.exports = router;
