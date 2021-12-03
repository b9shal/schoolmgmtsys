const express = require("express");
const router = express.Router();
const multer = require("multer")
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { admission } = require("../models")
const models = require("../models");
const { path } = require("express/lib/application");

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
  .isDate()
  .withMessage("academic year should be a date"),
  body("registerNo")
  .isString()
  .withMessage("register no. should be a string")
  .trim()
  .isLength({ min: 1, max: 255 }),
  body("admissionDate")
  .isDate()
  .withMessage("admission date should be a date")
]

const storage = multer.diskStorage({
  destination: './public/uploads/studentImages',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({
  storage: storage,
  limits:{fileSize: "1000000"},
  fileFilter: function(req, file, cb){
  const fileTypes = /jpeg|jpg|png/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if(mimeType && extname) {
        return cb(null, true)
    }
    cb('warning!!! only images can be uploaded')
  }
}).single('photo');


//route to list vendors
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
  };

});


//route to add a vendor
router.post("/add", validate, upload, async function(req, res) {

  try {
    console.log("im in")
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
        transportRoute,
        vehicleNo,
        hostelName,
        roomNo,
        previousSchoolName,
        qualification,
        remarks
      } = await req.body;
      const { photo } = req.file.path
      transaction = await models.sequelize.transaction()
      await admission.create({
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
      } = await req.body;
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
        remarks
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

