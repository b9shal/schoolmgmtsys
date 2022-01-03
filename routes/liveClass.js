const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { liveClass, classRoom, section } = require("../models");
const models = require("../models");
const moment = require("moment")

const validate = [
  body("title")
  .isString()
  .withMessage("live Class title should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("live Class title should be atleast 1 char and atmost 255 chars long")
]


router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await liveClass.findAll({
      include: [
        { model: classRoom, attributes: ["className"]},
        { model: section, attributes: ["sectionName"]}
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
        classRoomId,
        sectionId,
        title,
        liveClassMethod,
        date,
        startTime,
        endTime,
        duration,
        remarks,
        sendNotificationSms,
        selectAllSection
      } = await req.body
      transaction = await models.sequelize.transaction()
      if(selectAllSection){

        const sectionList = await section.findAll({ 
          where: { classRoomId },
          include : [{
            classSection, attributes: "classRoomId"
          }]
        }).catch(err => {
          console.log(err.message)
          success = false
          message = "add fail"
        })
        if(success){

          let liveClassSectionCollection = []
          sectionList.forEach(val =>  { 
            liveClassSectionCollection.push({
              classRoomId,
              sectionId: val.Id,
              title,
              liveClassMethod,
              date: moment(date).format('YYYY-MM-DD'),
              startTime,
              endTime,
              duration,
              remarks,
              sendNotificationSms,
              createdAt: new Date,
              updatedAt: new Date
            })
          })
          await models.sequelize.queryInterface
          .bulkInsert(models.liveClass.getTableName(),
          liveClassSectionCollection,
          {
            transaction 
          }).catch(err => {
            success = false
            message = "add fail"
            status = 400
            console.log(chalk.red.bold(err.message))
          })
          if(success){
            transaction.commit()
          }else {
            transaction.rollback()
          }
        }
      }
      else{
        await liveClass.create({ 
          classRoomId,
          sectionId,
          title,
          liveClassMethod,
          date: moment(date).format('YYYY-MM-DD'),
          startTime,
          endTime,
          duration,
          remarks,
          sendNotificationSms
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


router.delete("/delete/:classId/:sectionId", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const classId = req.params.id;
    const sectionId = req.params.id;
    await liveClass.destroy({ 
      where: {
        classRoomId: classId,
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
    console.log(err);
  };

  res.status(status).json({
    success,
    message
  })
});


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
//       await examDistribution.update({ 
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

