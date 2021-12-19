const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
const { itemCategory, sequelize } = require("../models");

const validate = [
  body("categoryName")
  .isString()
  .withMessage("category name should be a string")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("category name should be atleast 1 and atmost 50 chars long")
]

router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const categoryList = await itemCategory.findAll()
    .catch(err => {
      success = false
      message = "list fail"
      status = 500
      console.log(err.message)
    })

    res.status(status).json({
      success,
      message,
      categoryList
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


//route to add an item category
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
      const { categoryName } = await req.body
      transaction = await sequelize.transaction()
      await itemCategory.create({ 
        categoryName 
      },
      {
        transaction
      }).catch(async err => {
        message = "add fail"
        status = 500
        success = false
        await transaction.rollback()
        console.log(err);
      })
      await transaction.commit()
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


//route to delete an item category
router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id;
    await itemCategory.destroy({ 
      where: {
        id
      }
    })

  } catch (err) {
    success = false
    message = "delete fail"
    status = 500
    console.log(err);
  };

  res.status(status).json({
    success,
    message
  })
});

module.exports = router