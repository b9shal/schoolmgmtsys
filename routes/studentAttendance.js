const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { studentAttendance, admission } = require("../models");
const models = require("../models");

const validate = [
  body("status")
  .isString()
  .withMessage("status should be a string")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("status should be atleast 1 char and atmost 20 chars long")
]

router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await studentAttendance.findAll({
      attributes: ["status", "remarks"],
      include: [{ model: admission, attributes: ["name", "roll", "registerNo"]}]
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
        studentAttendanceEntry
      } = await req.body

      transaction = await models.sequelize.transaction()
      await models.sequelize.queryInterface
        .bulkInsert(models.studentAttendance.getTableName(),
        studentAttendanceEntry,
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


// router.delete("/delete/:id", async function(req, res){

//   try {
//     var success = true
//     var message = "delete success"
//     var status = 200
//     const id = req.params.id;
//     await studentCategory.destroy({ 
//       where: {
//         id
//       }
//     }).catch(err => {
//       success = false
//       message = "delete fail"
//       status = 500 
//       console.log(err.message)
//     })

//   } catch (err) {
//     success = false
//     message = "delete fail"
//     status = 400
//     console.log(err);
//   };

//   res.status(status).json({
//     success,
//     message
//   })
// });


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
//         categoryName
//       } = await req.body;
//       transaction = await models.sequelize.transaction()
//       await studentCategory.update({categoryName},
//       {
//         where: { id }
//       },
//       {
//         transaction
//       }).catch(err => {
//         message = "edit fail"
//         status = 500
//         success = false
//         console.log(chalk.red.bold("im from first inner catch",err.message))
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

