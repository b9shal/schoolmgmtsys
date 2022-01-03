const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
const { classRoom, section, subject, employee, lessonPlanning, role } = require("../models");
const models  = require("../models");
const moment = require("moment")

const validate = [
  body("topic")
  .isString()
  .withMessage("topic should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("topic should be between 1 to 100 chars long")
]


router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await lessonPlanning.findAll({
      attributes: ["id", "topic", "startDate", "endDate"],
      include: [{
        model: employee, attributes: ["name"],
        include: [{ model: role, where: { type: "Teacher"}, attributes: [] }]
      },
      {
        model: classRoom, attributes: ["className"]
      },
      {
        model: section, attributes: ["sectionName"]
      },
      {
        model: subject, attributes: ["subjectName"]
      }]
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
    console.log(err.message)

    res.status(status).json({
      success,
      message
    })
    console.log(err)
  };
})


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
        classId, 
        sectionId, 
        subjectId, 
        teacherId, 
        topic, 
        startDate, 
        endDate 
      } = await req.body      
      
      transaction = await models.sequelize.transaction()


      await lessonPlanning.create({ 
        classRoomId: classId, 
        sectionId, 
        subjectId, 
        employeeId: teacherId, 
        topic, 
        startDate: moment(startDate).format('YYYY-MM-DD'), 
        endDate: moment(endDate).format('YYYY-MM-DD')
      },
      {
        transaction
      }).catch(err => {
        message = "add fail"
        status = 500
        success = false
        console.log(err);
      })
      if(success) {
        await transaction.commit()
      }else {
        await transaction.rollback()
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
      const { 
        classId, 
        sectionId, 
        subjectId, 
        teacherId, 
        topic, 
        startDate, 
        endDate 
      } = await req.body
      transaction = await models.sequelize.transaction()
      await lessonPlanning.update({ 
        classRoomId: classId, 
        sectionId, 
        subjectId, 
        employeeId: teacherId, 
        topic, 
        startDate: moment(startDate).format('YYYY-MM-DD'), 
        endDate: moment(endDate).format('YYYY-MM-DD') 
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
    await lessonPlanning.destroy({
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
    status = 500
    res.status(status).json({
      success,
      message
    });
    console.log(err);
  };
});

module.exports = router
