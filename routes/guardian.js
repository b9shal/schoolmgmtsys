const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { guardian } = require("../models");
const models = require("../models");

const validate = [
  body("name")
  .isString()
  .withMessage("name should be a string")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("name should be atleast 1 char and atmost 20 chars long"),
  body("relation")
  .isString()
  .withMessage("relation should be a string")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("relation should be atleast 1 char and atmost 20 chars long"),
  body("mobile")
  .isMobilePhone()
  .withMessage("mobile number should be a valid mobile number"),
  body("address")
  .isString()
  .withMessage("address should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("address should at least 1 and atmost 255 chars long"),
  body("username")
  .isString()
  .isLength({ min: 1, max: 255 })
  .withMessage("username should be an email or a string"),
  body("password")
  .isString()
  .isLength({ min: 1, max: 50 })
  .withMessage("password is required field")
]


router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await guardian.findAll()

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
        name,
        relation,
        fatherName,
        motherName,
        occupation,
        income,
        education,
        city,
        state,
        mobile,
        email,
        address,
        photo,
        skipLoginAuth,
        username,
        password,
        retypePassword,
        facebook,
        twitter,
        linkedin,
      } = await req.body;
      transaction = await models.sequelize.transaction()
      await guardian.create({
        name,
        relation,
        fatherName,
        motherName,
        occupation,
        income,
        education,
        city,
        state,
        mobile,
        email,
        address,
        photo,
        skipLoginAuth,
        username,
        password,
        retypePassword,
        facebook,
        twitter,
        linkedin,
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


router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id;
    await guardian.destroy({ 
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
        name,
        relation,
        fatherName,
        motherName,
        occupation,
        income,
        education,
        city,
        state,
        mobile,
        email,
        address,
        photo,
        skipLoginAuth,
        username,
        password,
        retypePassword,
        facebook,
        twitter,
        linkedin,
      } = await req.body;
      transaction = await models.sequelize.transaction()
      await guardian.update({
        name,
        relation,
        fatherName,
        motherName,
        occupation,
        income,
        education,
        city,
        state,
        mobile,
        email,
        address,
        photo,
        skipLoginAuth,
        username,
        password,
        retypePassword,
        facebook,
        twitter,
        linkedin,
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

