const express = require("express");
const router = express.Router();
const { feeType, feeGroup, feeTypeFeeGroup } = require("../models");
const chalk = require('chalk')

//route to list fee types
router.get("/types", async function(req, res){

  try {
    console.log('Listing fee types')
    const data = await feeType.findAll();
    res.status(200).json(data);

  } catch (err) {
    console.log(chalk.red.bold("feeRoute.js 14 ",err.message));
  };
});


//route to add a fee type
router.post("/type/add", async function(req, res){

  try {
    const { name, description } = await req.body;
    await feeType.create({ name, description });
    res.status(200).json(data);

  } catch (err) {
    console.log(err);
  };

});

//route to delete a fee type
router.delete("/type/delete/:id", async function(req, res){
  
  try {
    const id = await req.params.id;
    await feeType.destroy({ where: { id: id } });
    res.status(200).send(`Fee type with id ${id} has been deleted`);

  } catch (err) {
    console.log(err);
  };
});


//route to update a fee type
router.patch("/type/update/:id", async function(req, res){
  
  try {
    const { name, description } = await req.body;
    const id = req.params.id;
    await feeType.update({
      name: name,
      description
    },
    {
      where: {
        id: id
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
