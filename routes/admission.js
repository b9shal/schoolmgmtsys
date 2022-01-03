const express = require("express");
const router = express.Router();
const chalk = require('chalk')
const { body, validationResult } = require("express-validator")
const { admission, guardian, role, user } = require("../models")
const multer = require("multer")
const models = require("../models")
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
  limits:{fileSize: 1000000},
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


router.post("/add", upload, validate, async function(req, res) {

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
      
      if(req.body.guardianId){
        var guardianId = guardianId
      }else {
        const {
          guardianName,
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
        name: guardianName,
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
        username,
        password,
        retypePassword,
        qualification,
        remarks
      } = await req.body

      await admission.create({
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
        transaction
      }).catch(err => {
        message = "add fail"
        status = 500
        success = false
      })
      if(username && password) {
        if(password === retypePassword){
          const userRole = await role.findOne({ where: { type: "Student" } })
          await user.create({
            username,
            password,
            roleId: userRole.id
          }).catch(function(err){
            success = false,
            message = "registration failed"
            status = 500
          })
        }else {
          success = false
          message = "password and retype password didnot match"
          status = 400
        }
      }
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
  }
  res.status(status).json({
    success,
    message,
    validationError
  })
})

module.exports = router