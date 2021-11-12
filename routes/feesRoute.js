const express = require("express");
const router = express.Router();
const { feeType, feeGroup, feeTypeFeeGroup } = require("../models");
const chalk = require('chalk')

//route to list fee types
router.get("/types", async function(req, res){

  try {
    console.log('i........ fee type s ')
    var data = await feeType.findAll();

  } catch (err) {
    console.log(chalk.red.bold("feeRoute.js 15 ",err.message));
  };
  res.status(200).json(data);


});


//route to add a fee type
router.post("/type/add", async function(req, res){

  try {
    const { name, description } = await req.body;
    const data = await feeTypes.create({ name, description });
    res.status(200).json(data);

  } catch (err) {
    console.log(err);
  };

});


//route to delete a fee type
router.delete("/type/delete/:id", async function(req, res){
  
  try {
    const id = await req.params.id;
    await feeTypes.destroy({ where: { id: id } });
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
    const data = await feeTypes.update({
      name: name,
      description: description
    },
    {
      where: {
        id: id
      }
    });
    
    res.status(200).send(`Fee type with id ${id} has been updated!!`);

  } catch (err) {
    console.log(err);
  };

});


//route to get group list
router.get("/groups", async function(req, res){

  try {
    const feeGroupList = await feeTypesFeeGroups.findAll();
    res.status(200).json(feeGroupList);
  } catch (err) {
    console.log(err);
  };
})


//route to add a feeGroup
router.post("group/add", async function(req, res){

  try {
    const { groupName, description } = await req.body;
    const data = await feeGroups.create({ groupName, description });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
})


//route to delete a feeGroup
router.delete("group/delete/:id", async function(req, res){

  try {
    const groupId = req.params.id;
    await feeGroups.destroy({ where: { id: groupId }});
  } catch (err) {
    console.log(err);
  }
})


//route to update a feeGroup
router.patch("group/update/:id", async function(req, res){

  try {
    const groupId = req.params.id;
    const { groupName, description, dueDate, amount } = await req.body;
    const data = await feeGroups.update({ 
      name: groupName,
      description: description,
      dueDate: dueDate,
      amount: amount
    },
    {
      where: {
        id: groupId
      }
    })
    res.status(200).json(data)
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
