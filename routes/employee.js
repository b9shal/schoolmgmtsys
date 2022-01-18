const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const { department, designation, employee, role, user } = require("../models")
const models  = require("../models")
const multer = require("multer")
const fs = require("fs")
const moment = require("moment")

const validate = [
  body("name")
  .isString()
  .withMessage("employee name should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("employee name should be between 1 to 255 chars long"),
  body("email")
  .isEmail()
  .withMessage("employee email should be a valid email"),
  body("phone")
  .isMobilePhone()
  .withMessage("employee phone no. should be a valid phone no."),
  body("joiningDate")
  .isDate()
  .withMessage("employee joining date should be a date"),
  body("qualification")
  .isString()
  .withMessage("employee qualification should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("employee qualification should be between 1 to 255 chars long"),
  body("presentAddress")
  .isString()
  .withMessage("employee present address should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("employee role should be between 1 to 255 chars long")
]

const storage = multer.diskStorage({
  destination: './public/uploads/employeeImages',
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
    const data = await employee.findAll({
      include: [
        {
          model: role, attributes: ["type"]
        },
        {
          model: department, attributes: ["departmentName"]
        },
        {
          model: designation, attributes: ["designationName"]
        }
      ]
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
    })
    console.log(err)
  };
});


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

      const {
        roleId,
        joiningDate,
        designationId,
        departmentId,
        qualification,
        experienceDetail,
        totalExperience,
        name,
        gender,
        religion,
        bloodGroup,
        dob,
        mobile,
        email,
        presentAddress,
        permanentAddress,
        skipLogAuth,
        username,
        password,
        retypePassword,
        facebook,
        twitter,
        linkedin,
        bankName,
        holderName,
        bankBranch,
        bankAddress,
        ifscCode,
        accountNumber
      } = await req.body

      const {
        photo
      } = req.file.path

      const userExist = await user.findOne({ where: { username } })
      if(userExist && password!== retypePassword) {
        message = "email already registered"
        status = 400
        success = false
      }else {

        const salt = await bcrypt.genSalt(10)
        const encodedPass = await bcrypt.hash(password, salt)

        transaction = await models.sequelize.transaction()
        
        const userId = await user.create({
          username,
          password: encodedPass
        },
        {
          transaction
        }).catch(err => {
          message = "employee registration failed"
          status = 500
          success = false
          console.log(err.message)
        })

        if(success) {

          await employee.create({
            roleId,
            userId,
            joiningDate: moment(joiningDate).format('YYYY-MM-DD'),
            designationId,
            departmentId,
            qualification,
            experienceDetail,
            totalExperience,
            name,
            gender,
            religion,
            bloodGroup,
            dob: moment(dob).format('YYYY-MM-DD'),
            mobile,
            email,
            presentAddress,
            permanentAddress,
            photo: req.file.path,
            skipLogAuth,
            username,
            password,
            facebook,
            twitter,
            linkedin,
            bankName,
            holderName,
            bankBranch,
            bankAddress,
            ifscCode,
            accountNumber
          }).catch(err => {
            message = "employee registration failed"
            status = 500
            success = false
            console.log(err)
          })
        }
        if(success){
          await transaction.commit()
        }else {
          await transaction.rollback()
        }
      }
    }
  }catch (err) {
    success = false
    message = "employee registration failed"
    status = 400
    console.log(err);
  };
  res.status(status).json({
    success,
    message,
    validationError
  })
})


router.patch("/edit/:id", upload, validate, async function(req, res) {

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
        roleId,
        joiningDate,
        designationId,
        departmentId,
        qualification,
        experienceDetail,
        totalExperience,
        name,
        gender,
        religion,
        bloodGroup,
        dob,
        mobile,
        email,
        presentAddress,
        permanentAddress,
        skipLogAuth,
        username,
        password,
        facebook,
        twitter,
        linkedin,
        bankName,
        holderName,
        bankBranch,
        bankAddress,
        ifscCode,
        accountNumber
      } = await req.body

      transaction = await models.sequelize.transaction()
      await employee.update({
        roleId,
        joiningDate: moment(joiningDate).format('YYYY-MM-DD'),
        designationId,
        departmentId,
        qualification,
        experienceDetail,
        totalExperience,
        name,
        gender,
        religion,
        bloodGroup,
        dob: moment(dob).format('YYYY-MM-DD'),
        mobile,
        email,
        presentAddress,
        permanentAddress,
        photo: req.file.path,
        skipLogAuth,
        username,
        password,
        facebook,
        twitter,
        linkedin,
        bankName,
        holderName,
        bankBranch,
        bankAddress,
        ifscCode,
        accountNumber
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
        console.log(err)
      })
      if(success) {
        await transaction.commit()
      }else {
        await transaction.rollback()
      }
    }
  }catch (err) {
    success = false
    message = "edit fail"
    status = 400
    console.log(err)
  }
  res.status(status).json({
    success,
    message,
    validationError
  })
})


router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "add success"
    var status = 200
    const id = req.params.id;
    await employee.destroy({
      where: {
        id
      }
    },
    {
      transaction
    }).catch(err => {
      message = "delete fail"
      success = false
      status = 500
      console.log(err)
    })
    if(success) {
      await transaction.commit()
    }else {
      await transaction.rollback()
    }
    res.status(status).json({
      success,
      message
    })
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
