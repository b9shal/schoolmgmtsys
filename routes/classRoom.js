const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
const { classRoom, section, classSection } = require("../models");
const models  = require("../models");

const validate = [
  body("className")
  .isString()
  .withMessage("class name should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("class name should be between 1 to 100 chars long"),
  body("classNo")
  .isNumeric()
  .withMessage("class no should be a number")
]

router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await classSection.findAll({
      attributes:[],
      include: [{ model: section, attributes: ["id", "sectionName", "capacity"] },
      { model: classRoom, attributes: ["id", "className", "classNo"] }]
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
      const { className, classNo, sectionId } = await req.body
      transaction = await models.sequelize.transaction()
      const { id } = await classRoom.create({ className, classNo },
      {
        transaction
      }).catch(err => {
        message = "add fail"
        status = 500
        success = false
        console.log(err.message);
      })
      if(success) {
        await transaction.commit()
        await classSection.create({
          classRoomId: id,
          sectionId
        })
      }else {
        await transaction.rollback()
      }
    }
  }catch (err) {
    success = false
    message = "add fail"
    status = 400
    console.log(err.message);
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
      const { className, classNo, sectionId } = await req.body
      transaction = await models.sequelize.transaction()
      await classRoom.update({ className, classNo },
        {
          where: { id }
        },
      {
        transaction
      }).catch(err => {
        message = "edit fail"
        status = 500
        success = false
        console.log(err);
      })
      if(success) {

        await transaction.commit()
        await classSection.update({
          classRoomId: id,
          sectionId
        },
        {
          where: { classRoomId: id }
        })
      }else {
        await transaction.rollback()
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
    var message = "add success"
    var status = 200
    const id = req.params.id;
    const transaction = await models.sequelize.transaction()

    await classRoom.destroy({
      where: { id }
    },
    {
      transaction
    }).catch(err => {
      message = "delete fail"
      success = false
      status = 500
      console.log(err.message)
    })
    if(success) {
      await classSection.destroy({
        where: { classRoomId: id }
      },{
      }).catch(err => {
        message = "delete fail"
        success = false
        status = 500
        console.log(err.message)
      })
      if(success){
        transaction.commit()
      }else {
        transaction.rollback()
      }
    }else {
      transaction.rollback()
    }
    res.status(status).json({
      success,
      message
    });
  } catch(err) {
    message = "delete fail"
    success = false
    status = 500
    res.status(status).json({
      success,
      message
    });
    console.log(err);
  };
});

module.exports = router;
