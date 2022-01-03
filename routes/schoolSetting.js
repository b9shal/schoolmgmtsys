const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
const { schoolSetting } = require("../models");
const models  = require("../models");
const multer  = require('multer')
const fs  = require('fs')
const path = require("path")


const validate = [
  body("branchName")
  .isString()
  .withMessage("branchName should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("branchName should be between 1 to 100 chars long"),
  body("branchCode")
  .isString()
  .withMessage("branchCode should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("branchCode should be between 1 to 100 chars long"),
  body("schoolName")
  .isString()
  .withMessage("schoolName should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("schoolName should be between 1 to 100 chars long"),
  body("email")
  .isString()
  .withMessage("email should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("email should be between 1 to 100 chars long"),
  body("currency")
  .isString()
  .withMessage("currency should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("currency should be between 1 to 100 chars long"),
  body("currencySymbol")
  .isString()
  .withMessage("currencySymbol should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("currencySymbol should be between 1 to 100 chars long"),
]

const storage = multer.diskStorage({
  destination: './public/uploads/schoolSettingImages',
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
}).fields([{ name: "systemLogo", maxCount: 1 },{ name: "textLogo", maxCount: 1 },{ name: "printingLogo", maxCount: 1  },{ name: "reportCard", maxCount: 1 }])


// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true)
  }else {
    cb(console.log("only images are allowed"))
  }
}


router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await schoolSetting.findAll()

    res.status(status).json({
      success,
      message,
      data
    })
    
  }catch (err) {
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
        branchName,
        branchCode,
        schoolName,
        email,
        mobile,
        currency,
        currencySymbol,
        city,
        state,
        address,
        teacherRestricted,
        studentLoginUsernamePrefix,
        studentLoginDefaultPassword,
        guardianLoginUsernamePrefix
      } = await req.body
      transaction = await models.sequelize.transaction()

      const createdData = await schoolSetting.create({
        branchName,
        branchCode,
        schoolName,
        email,
        mobile,
        currency,
        currencySymbol,
        city,
        state,
        address,
        teacherRestricted,
        studentLoginUsernamePrefix,
        studentLoginDefaultPassword,
        guardianLoginUsernamePrefix,
        systemLogo: req.files.systemLogo[0].path,
        textLogo: req.files.textLogo[0].path,
        printingLogo: req.files.printingLogo[0].path,
        reportCard: req.files.reportCard[0].path,
      },
      {
        transaction
      }).catch(err => {
        message = "add fail"
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
        branchName,
        branchCode,
        schoolName,
        email,
        mobile,
        currency,
        currencySymbol,
        city,
        state,
        address,
        teacherRestricted,
        studentLoginUsernamePrefix,
        studentLoginDefaultPassword,
        guardianLoginUsernamePrefix
      } = await req.body
      transaction = await models.sequelize.transaction()
      await schoolSetting.update({
        branchName,
        branchCode,
        schoolName,
        email,
        mobile,
        currency,
        currencySymbol,
        city,
        state,
        address,
        teacherRestricted,
        studentLoginUsernamePrefix,
        studentLoginDefaultPassword,
        guardianLoginUsernamePrefix,
        systemLogo: req.files.systemLogo[0].path,
        textLogo: req.files.textLogo[0].path,
        printingLogo: req.files.printingLogo[0].path,
        reportCard: req.files.reportCard[0].path,
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
    const data = await schoolSetting.findByPk(id).catch(err => {
      console.log(err.message)
    })
    if(data){
      await schoolSetting.destroy({ 
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
      fs.unlink(data.systemLogo, resultHandler);
      fs.unlink(data.printingLogo, resultHandler);
      fs.unlink(data.textLogo, resultHandler);
      fs.unlink(data.reportCard, resultHandler);
      }
    }else {
      success = false
      message = "delete fail"
      status = 400
    }
  }catch (err) {
    success = false
    message = "delete fail"
    status = 400
    console.log(err.message)
  }

  res.status(status).json({
    success,
    message
  })
})

module.exports = router;
