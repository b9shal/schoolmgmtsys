const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { expense, voucherHead, account } = require("../models");
const models = require("../models");

const validate = [
  body("ref")
  .isString()
  .withMessage("ref should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("ref should be atleast 1 char and atmost 20 chars long"),
  body("amount")
  .isNumeric()
  .withMessage("amount should be a number"),
  body("date")
  .isDate()
  .withMessage("date is a required field")
  .withMessage("address1 should at least 1 and atmost 255 chars long"),
  body("payVia")
  .isString()
  .withMessage("payment method is required")
  .isIn(["Cash", "Card", "Cheque", "Bank Transfer"])
]

//route to list expense
router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await expense.findAll({
      attributes: ["id", "ref", "amount", "description", "payVia", "date"],
      include: [
      { model: account, attributes: ["accountName"] },
      { model: voucherHead, attributes: ["voucherName"] }
    ]
    })
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
    });
    
  } catch (err) {
    success = false
    message = "list fail"
    status = 500

    res.status(status).json({
      success,
      message
    });
    console.log(err)
  };

});


//route to add a expense
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
        accountId,
        voucherHeadId,
        ref,
        amount,
        date,
        payVia,
        description
      } = await req.body;
      transaction = await models.sequelize.transaction()
      await expense.create({ 
        accountId,
        voucherHeadId,
        ref,
        amount,
        date,
        payVia,
        description
      },
      {
        transaction
      }).catch(err => {
        message = "add fail"
        status = 500
        success = false
        console.log(chalk.red.bold(err.message))
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


//route to delete a expense
router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id;
    await expense.destroy({ 
      where: {
        id
      }
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
    console.log(err);
  };

  res.status(status).json({
    success,
    message
  })
});


//route to update a expense
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
        accountId,
        voucherHeadId,
        ref,
        amount,
        date,
        payVia,
        description
      } = await req.body;
      transaction = await models.sequelize.transaction()
      await expense.update({ 
        accountId,
        voucherHeadId,
        ref,
        amount,
        date,
        payVia,
        description
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

module.exports = router;

