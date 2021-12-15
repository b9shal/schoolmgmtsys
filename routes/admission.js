const express = require("express");
const router = express.Router();
const multer = require("multer")
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { admission, guardian } = require("../models")
const models = require("../models");
var path = require("path");
const fs = require("fs");

const validate = [
  body("firstName")
  .isString()
  .withMessage("first name should be a string")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("first name should be atleast 1 char and atmost 20 chars long"),
  body("middleName")
  .optional({nullable: true}),
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
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
}).single('photo')


// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
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
    const data = await admission.findAll()

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
  }
})


router.post("/add", upload, validate, async function(req, res) {

  try {
    console.log(req.body)
    console.log(req.file)
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
      
      if(req.body.guardianId){
        var guardianId = guardianId
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
        } = await req.body

      transaction = await models.sequelize.transaction()

      var { id } = await guardian.create({
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
        address
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
        transaction.rollback()
      }else {
        transaction.commit()
      }
    }

    if(success) {
      guardianId = id

      const {
        classRoomId,
        sectionId,
        guardianId,
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

      await admission.create({
        sectionId,
        classRoomId,
        guardianId,
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
        transportRoute,
        vehicleNo,
        hostelName,
        roomNo,
        studentCategoryId,
        previousSchoolName,
        qualification,
        remarks,
        photo: req.file.path,
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


router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id;
    const data = await admission.findByPk(id).catch(err => {
      console.log(err.message)
    })
    console.log("data dfsladfasfd",data)
    if(data){
      console.log("im in here")
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
    }else{
      success = false
      message = "delete fail"
      status = 400
    }

  } catch (err) {
    success = false
    message = "delete fail"
    status = 400
    console.log(err.message)
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
        section,
        std,
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
        photo,
        transportRoute,
        vehicleNo,
        hostelName,
        roomNo,
        previousSchoolName,
        qualification,
        remarks
      } = await req.body
      transaction = await models.sequelize.transaction()
      await admission.update({
        section,
        std,
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
        photo,
        transportRoute,
        vehicleNo,
        hostelName,
        roomNo,
        previousSchoolName,
        qualification,
        remarks,
        photo: req.file.path
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
    console.log(err)
  };
  res.status(status).json({
    success,
    message,
    validationError
  })
})

module.exports = router