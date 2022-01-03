const express = require("express");
const router = express.Router();
const { admission, guardian, section, classRoom, bookRequest, book } = require("../models");
const { body, validationResult } = require("express-validator")
const path = require("path")
const multer = require("multer")
const fs = require("fs")
const moment = require("moment")

const validate = [
  body("firstName")
  .isString()
  .withMessage("first name should be a string")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("first name should be atleast 1 char and atmost 20 chars long"),
  body("middleName")
  .optional({ nullable: true }),
  body("lastName")
  .isString()
  .withMessage("last name should be a string")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("last name should be atleast 1 char and atmost 20 chars long"),
  body("academicYear")
  .isString()
  .withMessage("academic year should be a date"),
  body("registerNo")
  .isString()
  .withMessage("register no. should be a string")
  .trim()
  .isLength({ min: 1, max: 255 }),
  body("admissionDate")
  .isString()
  .withMessage("admission date should be a date")
]


const storage = multer.diskStorage({
  destination: './public/uploads/studentImages',
  filename: function (req, file, cb) {
    const datetimestamp = Date.now()
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});


const upload = multer({
  storage: storage,
  limits:{ fileSize: 1000000 },
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
}).single('photo')


// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb(console.log("only images are allowed"))
  }
}



router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const classRoomId = parseInt(req.query.classId)
    const sectionId = parseInt(req.query.sectionId)
    const data = await admission.findAll({
      where: { sectionId, classRoomId },
      attributes: ["id", "firstName", "middleName", "lastName", "registerNo", "roll", "dob", "photo", "presentAddress", "email", "phone"],
      include:[
        { model: guardian, attributes: ["name"] },
        { model: section, attributes: ["sectionName"] },
        { model: classRoom, attributes: ["className"] }
      ]
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
    res.status(status).json({
      success,
      message
    });
  };
});



router.get("/bookIssue", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const studentId = parseInt(req.query.studentId)
    const data = await bookIssue.findAll({
      where: { userId: studentId },
      attributes: ["title"],
      include: [
        { model: bookRequest, attributes: ["dateOfIssue", "dateOfExpiry"] }
      ]
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
    res.status(status).json({
      success,
      message
    });
  };
});



router.patch("/edit/:id", upload, validate, async function(req, res){

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
      const id = await req.params.id
      await admission.findByPk(id)
      const {
        classRoomId,
        sectionId,
        guardianId,
        admissionCategoryId,
        academicYear,
        registerNo,
        admissionDate,
        firstName,
        middleName,
        lastName,
        gender,
        dob,
        bloodGroup,
        roll,
        motherTongue,
        religion,
        caste,
        phone,
        email,
        city,
        state,
        presentAddress,
        permanentAddress,
        studentCategoryId,
        previousSchoolName,
        qualification,
        remarks
      } = await req.body
      transaction = await models.sequelize.transaction()
      await admission.update({
        sectionId,
        classRoomId,
        guardianId,
        admissionCategoryId,
        academicYear: moment(academicYear).format('YYYY-MM-DD'),
        registerNo,
        admissionDate: moment(admissionDate).format('YYYY-MM-DD'),
        firstName,
        middleName,
        lastName,
        gender,
        dob: moment(dob).format('YYYY-MM-DD'),
        bloodGroup,
        roll,
        motherTongue,
        religion,
        caste,
        phone,
        email,
        city,
        state,
        presentAddress,
        permanentAddress,
        vehicleRouteId,
        vehicleId,
        hostelRoomId,
        hostelId,
        studentCategoryId,
        previousSchoolName,
        qualification,
        remarks,
        photo: req.file.path,
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
    console.log(err)
  };
  res.status(status).json({
    success,
    message,
    validationError
  })
})



router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id
    const data = await admission.findByPk(id).catch(err => {
      console.log(err.message)
    })
    if(data){
      await admission.destroy({ 
        where: {
          id
        }
      }).catch(err => {
        success = false
        message = "delete fail"
        status = 500 
        console.log(err.message)
      })
      if(success){
        let resultHandler = function (err) {
          if (err) {
            console.log("file delete failed", err);
          } else {
            console.log("file deleted");
          }
        }
      fs.unlink(data.photo, resultHandler);
      }
    }else {
      success = false
      message = "delete fail"
      status = 400
    }

  } catch (err) {
    success = false
    message = "delete fail"
    status = 400
    console.log(err.message)
  }

  res.status(status).json({
    success,
    message
  })
});

module.exports = router