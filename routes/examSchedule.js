const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { classRoom, section, subject, examSchedule, examTerm, examHall } = require("../models");
const models = require("../models");

const validate = [
  body("name")
  .isString()
  .withMessage("exam term name should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("exam term should be atleast 1 char and atmost 255 chars long")
]


router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await examSchedule.findAll({
      attributes: ["examDate", "startingTime", "endingTime", "examDuration", "fullMarks", "passMarks"],
      include: [
        { model: examTerm, attributes: ["name"] },
        { model: classRoom, attributes: ["className"] },
        { model: section, attributes: ["sectionName"] },
        { model: subject, attributes: ["subjectName"] },
        { model: examHall, attributes: ["hallNo"] },
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


router.post("/add", async function(req, res) {

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
        examScheduleEntry
      } = await req.body
      transaction = await models.sequelize.transaction()
      await models.sequelize.queryInterface
      .bulkInsert(models.examSchedule.getTableName(),
      examScheduleEntry,
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



router.delete("/delete", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const classRoomId = parseInt(req.query.classId);
    const sectionId = parseInt(req.query.sectionId);
    await examSchedule.destroy({ 
      where: {
        classRoomId,
        sectionId
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
    console.log(err)
  }

  res.status(status).json({
    success,
    message
  })
})



// router.patch("/edit/:id", validate, async function(req, res){

//   try {

//     var success = true
//     var message = "edit success"
//     var status = 200
//     var validationError = null
//     var transaction = null
//     const errors = validationResult(req)

//     if(!errors.isEmpty()) {
//       message = "edit fail"
//       status = 400
//       success = false
//       validationError = []
//       errors.array().forEach(val => {
//         validationError.push({
//           param: val.param,
//           message: val.msg
//         })
//       })
//     }else {
//       const id = req.params.id
//       const { 
//         name
//       } = await req.body;
//       transaction = await models.sequelize.transaction()
//       await models.sequelize.queryInterface
//       .bulkInsert(models.feeTypeFeeGroup.getTableName(),
//       feeTypeFeeGroupCollection)
//       await examTerm.update({ 
//         name
//       },
//       {
//         where: { id }
//       },
//       {
//         transaction
//       }).catch(err => {
//         message = "edit fail"
//         status = 500
//         success = false
//       })
//       if(!success) {
//         await transaction.rollback()
//       }else {
//         await transaction.commit()
//       }
//     }
//   }catch (err) {
//     success = false
//     message = "edit fail"
//     status = 400
//     console.log(err);
//   };
//   res.status(status).json({
//     success,
//     message,
//     validationError
//   })
// });


module.exports = router;