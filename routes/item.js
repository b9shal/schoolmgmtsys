const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
const { item, itemCategory } = require("../models");
const models  = require("../models");

const validate = [
  body("itemName")
  .isString()
  .withMessage("item name should be a string")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("item name should be between 1 to 50 chars long")
]

//route to list items in a particular category
router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await item.findAll({
      attributes: ["id", "itemName"],
      include: [{ model: itemCategory, attributes: ["categoryName"] }]
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


//route to add an item in a particular category
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
      const { itemName, itemCategoryId } = await req.body
      transaction = await models.sequelize.transaction()
      await item.create({ itemName, itemCategoryId },
      {
        transaction
      }).catch(err => {
        message = "add fail"
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
    message = "add fail"
    status = 400
    console.log(err);
  };
  res.status(status).json({
    success,
    message
  })
});


//route to delete an item in a particular category
router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = await req.params.id;
    console.log(id)
    await item.destroy({
      where: {
        id
      }
    });
    res.status(status).json({
      success,
      message
    });
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
