const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { 
  vendor, 
  itemCategory, 
  item 
} = require("../models");

//route to list vendors
router.get("/vendor/list", async function(req, res){

  try {
    const vendorList = await vendor.findAll();
    res.status(200).json(vendorList);

  } catch (err) {
    console.log(chalk.red.bold("inventoryRoute.js 15 ",err.message));
  };
});


//route to add a vendor
router.post("/vendor/add", async function(req, res){

  try {
    const { 
      vendorName, 
      phone,
      address1,
      address2,
      email
    } = await req.body;

    await vendor.create({ 
      vendorName, 
      phone,
      address1,
      address2,
      email
    });

    const vendorList = await vendor.findAll()
    res.status(200).json(vendorList)
  } catch (err) {
    console.log(err);
  };
});

//route to delete a vendor
router.delete("/vendor/delete/:id", async function(req, res){

  try {
    const vendorId = await req.params.id;
    await vendor.destroy({ 
      where: {
        id: vendorId
      }
    });
  } catch (err) {
    console.log(err);
  };
});


//route to update a vendor
router.patch("/vendor/update/:id", async function(req, res){

  try {
    const vendorId = await req.params.id;

    const {
      vendorName,
      phone,
      address1,
      address2,
      email
    } = await req.body;

    await vendor.update({
      vendorName,
      phone,
      address1,
      address2,
      email
      },
      {
      where: {
        id: vendorId
      }
    });

    const vendorList = vendor.findAll();
    res.status(200).json(vendorList);
  } catch (err) {
    console.log(err);
  };
});


//route to list item category
router.get("/itemCategory/list", async function(req, res){

  try {
    const categoryList = await itemCategory.findAll();
    res.status(200).json(categoryList);

  } catch (err) {
    console.log(chalk.red.bold("inventoryRoute.js 15 ",err.message));
  };
});


//route to add an item category
router.post("/itemCategory/add", async function(req, res){

  try {
    const { categoryName } = await req.body;
    await itemCategory.create({ categoryName });
    res.status(200).send("item added");
  } catch (err) {
    console.log(err);
  };
});


//route to delete an item category
router.delete("/itemCategory/delete/:id", async function(req, res){

  try {
    const categoryId = await req.params.id;
    await itemCategory.destroy({ 
      where: {
        id: categoryId
      }
    });
    res.status(200).send("item deleted");
  } catch (err) {
    console.log(err);
  };
});


//route to list items in a particular category
router.get("/item/list", async function(req, res){

  try {
    const itemList = await item.findAll();
    res.status(200).json(itemList);
  } catch (err) {
    console.log(err);
  };
});


//route to add an item in a particular category
router.post("/item/add", async function(req, res){

  try {
    const itemList = await item.create();
    res.status(200).json(itemList);
  } catch (err) {
    console.log(err);
  };
});


//route to delete an item in a particular category
router.delete("/item/delete/:id", async function(req, res){

  try {
    const itemId = await req.parmas.id;
    const itemList = await item.destroy({
      where: {
        id: itemId
      }
    });
    res.status(200).json(itemList);
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;

