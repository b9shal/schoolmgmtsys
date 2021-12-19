const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
const { subject } = require("../models");
const models  = require("../models");

const validate = [
  body("subjectName")
  .isString()
  .withMessage("subject name should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("section name should be between 1 to 255 chars long"),
  body("subjectCode")
  .isNumeric()
  .withMessage("subject code should be a number"),
  body("subjectType")
  .isString()
  .withMessage("subject type should be a string")
  .isIn(["Theory", "Practical", "Optional", "Mandatory"])
  .withMessage("subject type should be either Theory, Practical, Optional or Mandatory")
]


router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await subject.findAll()

    res.status(status).json({
      success,
      message,
      data
    });
    
  } catch (err) {
    success = false
    message = "list fail"
    status = 500
    console.log(err.message)

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
      const { subjectName, subjectCode, subjectAuthor, subjectType } = await req.body
      transaction = await models.sequelize.transaction()
      await subject.create({ subjectName, subjectCode, subjectAuthor, subjectType },
      {
        transaction
      }).catch(err => {
        message = "add fail"
        status = 500
        success = false
        console.log(err);
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


router.patch("/edit/:id", validate, async function(req, res) {

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
      const { subjectName, subjectCode, subjectAuthor, subjectType } = await req.body
      transaction = await models.sequelize.transaction()
      await subject.update({ 
        subjectName, 
        subjectCode, 
        subjectAuthor, 
        subjectType 
      },
      { where: { id }},
      {
        transaction
      }).catch(err => {
        message = "edit fail"
        status = 500
        success = false
        console.log(err);
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


router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id;
    await subject.destroy({
      where: {
        id
      }
    });
    res.status(status).json({
      success,
      message
    });
  } catch(err) {
    message = "delete fail"
    success = false
    console.log(err);
    status = 500
    res.status(status).json({
      success,
      message
    });
  };
});

module.exports = router;
