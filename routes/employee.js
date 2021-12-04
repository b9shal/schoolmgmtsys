const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
const { department, designation, employee, employeeDepartmentDesignation } = require("../models");
const models  = require("../models");

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
  body("role")
  .isString()
  .withMessage("employee role should be a string")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("employee role should be between 1 to 255 chars long"),
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
  .withMessage("employee role should be between 1 to 255 chars long"),
  body("username")
  .isEmail()
  .withMessage("employee username should be a valid email"),
  body("password")
  .isEmpty()
  .withMessage("employee password address should not be empty"),
  body("bankName")
  .isString()
  .withMessage("employee bank name should be a string")
  .isLength({ min: 1, max: 255 })
  .withMessage("employee bank name should be between 1 to 255 chars long"),
  body("holderName")
  .isString()
  .withMessage("acc. holder name should be a string")
  .isLength({ min: 1, max: 255 })
  .withMessage("acc. holder name should be between 1 to 255 chars long"),
  body("bankBranch")
  .isString()
  .withMessage("bank branch should be a string")
  .isLength({ min: 1, max: 255 })
  .withMessage("bank branch should be between 1 to 255 chars long"),
  body("accountNumber")
  .isString()
  .trim()
  .withMessage("account number should be a string")
  .isLength({ min: 10, max: 255 })
  .withMessage("account number should be between 10 to 255 long")
]


router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await employeeDepartmentDesignation.findAll({
      include: [
        {
          model: employee
        },
        {
          model: department, attributes: ["departmentId", "depatymentName"]
        },
        {
          model: designation, attributes: ["designationId", "designationName"]
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
    });
    console.log(err)
  };
});


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
      const {
        experienceDetail,
        totalExperience,
        departmentId,
        designationId,
        name,
        gender,
        religion,
        bloodGroup,
        dob,
        mobile,
        email,
        presentAddress,
        permanentAddress,
        photo,
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
      const employeeId = await employee.create({
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
        photo,
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
        transaction
      }).catch(err => {
        message = "add fail"
        status = 500
        success = false
        console.log(err);
      })
      if(success) {
        await employeeDepartmentDesignation.create({
          employeeId,
          departmentId,
          designationId
        },
        {
          transaction
        }).catch(err => {
          message = "add fail"
          status = 500
          success = false
          console.log(err)
        })

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
        experienceDetail,
        totalExperience,
        departmentId,
        designationId,
        name,
        gender,
        religion,
        bloodGroup,
        dob,
        mobile,
        email,
        presentAddress,
        permanentAddress,
        photo,
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
        photo,
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
        console.log(err);
      })
      if(success) {
        await employeeDepartmentDesignation.update({
          employeeId: id,
          designationId,
          departmentId
        },
        {
          where: { employeeId: id}
        })
        await transaction.commit()
      }else {
        await transaction.rollback()
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
      await employeeDepartmentDesignation.destroy({ where: { employeeId: id }})
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
