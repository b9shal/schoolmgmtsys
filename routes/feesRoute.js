const express = require("express");
const router = express.Router();
const { feeType, feeGroup, feeTypeFeeGroup } = require("../models");
const chalk = require('chalk');
const { body, validationResult } = require("express-validator");
const models = require("../models")


//route to list fee types
router.get("/list", async function(req, res){

  try {

    var message = "add success"
    var status = 200
    var success = true
    var validationError = null
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      message = "add fail"
      status = 400
      success = false
      validationError = errors.array()
    }else {
      var transaction = models.sequelize.transaction()
      const data = await feeType.findAll();
      res.status(200).json(data);
    }

  } catch (err) {
    console.log(chalk.red.bold("feeRoute.js 14 ",err.message));
  };
});


//route to add a fee type
router.post("/add",[
  body("name")
  .isLength({ min: 1 })
  .withMessage("name should at least 1 char long")
], async function(req, res){

  try {

    console.log('req body....... ',req.body)
    var message = "add success"
    var status = 200
    var success = true
    var validationError = null
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      message = "add fail"
      status = 400
      success = false
      validationError = errors.array()
    }else {
      var transaction = await models.sequelize.transaction()
      const { name, description } = await req.body
      const data = await feeType.create({ name, description }, { transaction }).catch(err => {
        console.log("err is here ",err.message)
        success = false
      })
      success = false
      if(success){
        transaction.commit()
      }else{
        transaction.rollback()
      }

      console.log(data)
    }
    
  } catch (err) {
    var message = "add fail"
    var status = 400
    var success = false

    console.log(err)
  }
  res.status(status).json({
    message,
    success,
    validationError
  })
})

//route to delete a fee type
router.delete("/delete/:id", async function(req, res){
  
  try {
    const id = req.params.id;
    await feeType.destroy({ where: { id: id } });
    res.status(200).send(`Fee type with id ${id} has been deleted`);

  } catch (err) {
    console.log(err);
  };
});


//route to update a fee type
router.patch("/update/:id", async function(req, res){
  
  try {
    const { name, description } = await req.body;
    const id = req.params.id;
    await feeType.update({
      name,
      description
    },
    {
      where: {
        id
      }
    }).catch(err =>{
      console.log(chalk.red.bold("feeRoute.js 63 ",err.message))
      res.status(200).send(`Fee type with id ${id} has been updated!!`);
    })

  } catch (err) {
    console.log(err);
  };
});


//route to get feeGroup list
router.get("/groups", async function(req, res){

  try {
    const feeGroupList = await feeTypeFeeGroup.findAll({
      include:[
        {
          model: feeGroup,
          attributes: ["groupName", "description"]
        },
        {
          model: feeType,
          attributes: ["name"]
        },
      ],
      attributes: ["dueDate", "amount"],
    });
    res.status(200).json(feeGroupList);

  } catch (err) {
    console.log(err);
  };
})


//route to add a feeGroup
router.post("/group/add", async function(req, res){
  try {
    const { 
      groupName,
      description,
      feeType
    } = req.body

    // let feeTypeList = []
    // feeType.forEach(val => {
    //   feeTypeList.push({
    //     groupName: groupName,
    //     description: description,
    //     feeType: val.name,
    //     dueDate: val.dueDate,
    //     amount: val.amount
    //   })
    // });
    // await feeTypeFeeGroup.bulkCreate(feeTypeList);

    res.status(200).json();

  } catch (err) {
    console.log(err);
  }
})


//route to delete a feeGroup
router.delete("/group/delete/:id", async function(req, res){

  try {
    const groupId = req.params.id;
    await feeTypeFeeGroup.destroy({ where: { id: groupId }});

  } catch (err) {
    console.log(err);
  }
})


//route to update a feeGroup
router.patch("/group/update/:id", async function(req, res){

  try {
    const groupId = req.params.id;
    const { 
      groupName,
      description,
      dueDate,
      amount
    } = await req.body;
    await feeTypeFeeGroup.update({
      name: groupName,
      description,
      dueDate,
      amount
    },
    {
      where: {
        id: groupId
      }
    })
    const feeGroupList = await feeTypeFeeGroup.findAll();
    res.status(200).json(feeGroupList);

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
