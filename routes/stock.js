const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { item, stock, vendor } = require("../models");
const models = require("../models");

const validate = [
  body("quantity")
  .isNumeric()
  .withMessage("quantity should be a number"),
  body("rate")
  .isNumeric()
  .withMessage("rate should be a number")
]


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
        vendorId,
        itemId,
        quantity,
        rate
      } = await req.body;
      transaction = await models.sequelize.transaction()
      await stock.create({ 
        vendorId,
        itemId,
        quantity,
        rate
      },
      {
        transaction
      }).catch(err => {
        message = "add fail"
        status = 500
        success = false
        console.log(chalk.red.bold(err.message))
      })
      if(!success) {
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

module.exports = router