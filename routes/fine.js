const express = require("express");
const router = express.Router();
const { fine, feeGroup, feeType } = require("../models");
const models = require("../models");
const chalk = require('chalk');
const { body, validationResult } = require("express-validator");

const validate = [
  body("fineType")
  .isString()
  .withMessage("fine type should be a string")
  .trim()
  .escape()
  .isLength({ min: 1, max: 50 })
  .withMessage("name should be atleast 1 char and atmost 20 chars long"),
  body("fineValue")
  .isNumeric()
  .withMessage("fine value should be a decimal no.")
]


router.get("/list", async function(req, res){

  try {
    var message = "list success"
    var status = 200
    var success = true
    const fineList = await fine.findAll({
      attributes: ["id", "fineValue", "fineType", "lateFeeFrequency"],
      include: [
        { model: feeGroup, attributes: ["id", "groupName"] },
        { model: feeType, attributes: ["id", "name"] }
      ]
    })
    res.status(status).json({
      message,
      success,
      fineList
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
      const { feeTypeId, feeGroupId, fineType, fineValue, lateFeeFrequency } = await req.body
      transaction = await models.sequelize.transaction()
      await fine.create({ feeTypeId, feeGroupId, fineType, fineValue, lateFeeFrequency }, 
      { 
        transaction
      }).catch(err => {
        message = "add fail"
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
      const { feeTypeId, feeGroupId, fineType, fineValue, lateFeeFrequency } = await req.body
      transaction = await models.sequelize.transaction()
      await fine.update({ feeTypeId, feeGroupId, fineType, fineValue, lateFeeFrequency },
      {
        where: { id }
      },
      { 
        transaction
      }).catch(err => {
        message = "edit fail"
        status = 500
        success = false
        console.log("im from inside catch block", err.messsage)
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
    await fine.destroy({ where: { id } })
  }catch (err) {
    message = "delete fail"
    success = false
    status = 500
    console.log(err)
  }
  res.status(status).json({
    message,
    success
  })
})

module.exports = router;
