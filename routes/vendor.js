const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { vendor } = require("../models");
const models = require("../models");

const validate = [
  body("vendorName")
  .isString()
  .withMessage("vendor name should be a string")
  .trim()
  .isLength({ min: 1, max: 20 })
  .withMessage("vendor name should be atleast 1 char and atmost 20 chars long"),
  body("phone")
  .isMobilePhone()
  .withMessage("phone number should be a valid phone number"),
  body("address1")
  .isString()
  .withMessage("address1 should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("address1 should at least 1 and atmost 255 chars long")
]

//route to list vendors
router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await vendor.findAll()

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


//route to add a vendor
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
        vendorName,
        phone,
        address1,
        address2,
        email
      } = await req.body;
      transaction = await models.sequelize.transaction()
      await vendor.create({
        vendorName, 
        phone,
        address1,
        address2,
        email
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


//route to delete a vendor
router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id;
    await vendor.destroy({ 
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


//route to update a vendor
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
        vendorName,
        phone,
        address1,
        address2,
        email
      } = await req.body;
      transaction = await models.sequelize.transaction()
      await vendor.update({
        vendorName, 
        phone,
        address1,
        address2,
        email
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
        message = "edit fail"
        status = 500
        success = false
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

