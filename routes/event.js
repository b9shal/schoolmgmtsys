const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { body, validationResult } = require("express-validator")
const { event } = require("../models");
const models = require("../models");
const eventType = require("../models/eventType");
const moment = require("moment")

const validate = [
  body("title")
  .isString()
  .withMessage("event title should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("event title should be atleast 1 char and atmost 255 chars long"),
  body("audience")
  .isString()
  .withMessage("audience should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("audience should be atleast 1 char and atmost 255 chars long")
]

const storage = multer.diskStorage({
  destination: './public/uploads/eventImages',
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
}).single('image')


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
    const data = await event.findAll({
      include: [
        { model: eventType, attributes: ["name"] }
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
        title,
        startDate,
        endDate,
        eventTypeId,
        audience,
        description,
        holiday,
      } = await req.body
      transaction = await models.sequelize.transaction()

      await event.create({ 
        title,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        eventTypeId,
        audience,
        description,
        holiday,
        image: req.file.path,
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
    await event.destroy({ 
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
      const id = req.params.id
      const { 
        title,
        startDate,
        endDate,
        eventTypeId,
        audience,
        description,
        holiday,
      } = await req.body;
      transaction = await models.sequelize.transaction()
      await event.update({ 
        title,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        eventTypeId,
        audience,
        description,
        holiday,
        image: req.file.path,
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

