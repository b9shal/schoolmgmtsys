const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { book, bookCategory } = require("../models");
const models  = require("../models");
const path = require('path');
const multer = require("multer");
const fs = require("fs")

const validate = [
  body("title")
  .isString()
  .withMessage("book title should be a string")
  .trim()
  .isLength({ min: 1 })
  .withMessage("book title should be atleast 1 char long"),
  body("publisher")
  .isString()
  .withMessage("publisher name  should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("publisher name should be between 1 to 255 chars long"),
  body("price")
  .isNumeric()
  .withMessage("price should be a number"),
  body("totalStock")
  .isNumeric()
  .withMessage("stock should be a number")
]


const storage = multer.diskStorage({
  destination: './public/uploads/bookCoverImages',
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
}).single('coverImage')


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
    const data = await book.findAll({
      include: [{ model: bookCategory, attributes: ["categoryName"] }]
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
    });
    console.log(err)
  };
});


router.post("/add", upload, validate, async function(req, res) {

  try {

    console.log("in here")
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
        isbn, 
        author, 
        edition, 
        purchaseDate, 
        publisher, 
        description, 
        price, 
        totalStock, 
        booKCategoryId 
      } = await req.body
      
      transaction = await models.sequelize.transaction()

      await book.create({ 
        title, 
        isbn, 
        author, 
        edition, 
        purchaseDate, 
        publisher, 
        description, 
        price, 
        totalStock, 
        booKCategoryId,
        coverImage: req.file.path
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
    console.log(err)
  }
  res.status(status).json({
    success,
    message,
    validationError
  })
});


router.patch("/edit/:id", validate, async function(req, res) {

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
        isbn, 
        author, 
        edition, 
        purchaseDate, 
        publisher, 
        description, 
        price, 
        totalStock, 
        booKCategoryId 
      } = await req.body

      transaction = await models.sequelize.transaction()
      await hostel.update({ 
        title, 
        isbn, 
        author, 
        edition, 
        purchaseDate, 
        publisher, 
        description, 
        price, 
        totalStock, 
        booKCategoryId,
        coverImage: req.file.path,
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
})


router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id;
    const data = await book.findByPk(id).catch(err => {
      console.log(err.message)
    })
    if(data){
      await book.destroy({ 
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
      fs.unlink(data.coverImage, resultHandler);
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

module.exports = router