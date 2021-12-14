const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
const { vehicleAssign, vehicleRoute, vehicle, stoppAge } = require("../models");
const models  = require("../models");

const validate = [
  body("vehicleNo")
  .isString()
  .withMessage("vehicle number should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("vehicle no should be between 1 to 100 chars long"),
  body("capacity")
  .isNumeric()
  .withMessage("capacity should be a no."),
  body("driverName")
  .isString()
  .withMessage("driver name should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("driver name no should be between 1 to 100 chars long"),
  body("driverPhone")
  .isString()
  .withMessage("driver phone number should be a valid phone number"),
  body("driverLicense")
  .isString()
  .withMessage("driver license number should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("driver license no should be between 1 to 100 chars long")
]


router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await vehicleAssign.findAll({
      include:[
        { model: vehicleRoute, attributes: ["routeName", "startPlace", "stopPlace"] },
        { model: vehicle, attributes: ["vehicleNo"]},
        { model: stoppAge, attributes: ["stoppage", "routeFare"] }
      ]
    })

    res.status(status).json({
      success,
      message,
      data
    })
    
  } catch (err) {
    success = false
    message = "list fail"
    status = 500
    console.log(err.message)

    res.status(status).json({
      success,
      message
    })
  };
})


router.post("/add", async function(req, res) {

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
      const { vehicleRouteId, vehicleId, stoppAgeId } = await req.body

      const assignVehicle = []
      vehicleId.forEach(val => {
        assignVehicle.push({
          vehicleRouteId,
          stoppAgeId,
          vehicleId: val,
          createdAt: new Date,
          updatedAt: new Date
        })
      });
      transaction = await models.sequelize.transaction()

      await models.sequelize.queryInterface
        .bulkInsert(models.vehicleAssign.getTableName(),
        assignVehicle,
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


router.patch("/edit/:id", async function(req, res) {

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
      const { vehicleRouteId, vehicleId, stoppAgeId } = await req.body
      transaction = await models.sequelize.transaction()
      await vehicleAssign.update({ vehicleRouteId, vehicleId, stoppAgeId },
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
    var message = "add success"
    var status = 200
    const id = req.params.id;
    await vehicleAssign.destroy({
      where: { id }
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
