const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { attachmentBook, attachmentBookType, classRoom, subject } = require("../models");
const models = require("../models");
const multer = require("multer");
const path = require('path');
const fs = require("fs")


const validate = [
  body("title")
  .isString()
  .withMessage("type name should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("type name should be atleast 1 char and atmost 255 chars long")
]

const storage = multer.diskStorage({
  destination: './public/uploads/attachmentBookImages',
  filename: function (req, file, cb) {
    const datetimestamp = Date.now()
    console.log("inside storge")
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});


const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
}).single('attachmentFile')


// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if(mimetype && extname){
    return cb(null,true)
  } else {
    cb('Error: Images Only!')
  }
}


router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await attachmentBook.findAll({
      attributes: ["id", "title", "publishDate", "remarks", "attachmentFile"],
      include: [
        { model: attachmentBookType, attributes: ["typeName"]},
        { model: classRoom, attributes: ["className"]},
        { model: subject, attributes: ["subjectName"]},
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


router.post("/add", upload, validate, async function(req, res) {

  try {

    console.log(req.body)
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
        subjectId,
        attachmentBookTypeId,
        title,
        publishDate,
        remarks,
        notAccordingToSubject,
        availableForAllClasses
       } = await req.body
      transaction = await models.sequelize.transaction()
      const newData = await attachmentBook.create({ 
        classRoomId,
        subjectId,
        attachmentBookTypeId,
        title,
        publishDate,
        remarks,
        notAccordingToSubject,
        availableForAllClasses,
        attachmentFile: req.file.path
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


router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id;
    const data = await attachmentBook.findByPk(id).catch(err => {
      console.log(err.message)
    })
    if(data){
      await attachmentBook.destroy({ 
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
          }else {
            console.log("file deleted");
          }
        }
      fs.unlink(data.attachmentFile, resultHandler);
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
  };

  res.status(status).json({
    success,
    message
  })
});


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
        classRoomId,
        subjectId,
        attachmentBookTypeId,
        title,
        publishDate,
        remarks
       } = await req.body;
      transaction = await models.sequelize.transaction()
      await attachmentBook.update({ 
        classRoomId,
        subjectId,
        attachmentBookTypeId,
        title,
        publishDate,
        remarks,
        attachmentFile: req.file.path
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
        console.log(err.message)
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

module.exports = router;

