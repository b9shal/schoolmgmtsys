const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { bookIssue, role , bookCategory, book, user} = require("../models");
const models = require("../models")
const moment = require("moment")

router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await bookIssue.findAll({
      include: [
        {
          model: book, attributes: ["title", "coverImage"]
        },
        {
          model: bookCategory, attributes: ["categoryName"]
        },
        {
          model: role, attributes: ["type"]
        },
        {
          model: user, attributes: ["username"]
        }
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


router.post("/add", async function(req, res) {

  try {
  var success = true
  var message = "add success"
  var status = 200
  var transaction = null


  const { 
    roleId,
    bookId,
    bookCategoryId,
    userId,
    dateOfExpiry
  } = await req.body;
  transaction = await models.sequelize.transaction()
  await bookIssue.create({ 
    roleId,
    bookId,
    bookCategoryId,
    userId,
    dateOfExpiry: moment(dateOfExpiry).format('YYYY-MM-DD')
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


router.delete("/delete/:id", async function(req, res){

  try {
    var success = true
    var message = "delete success"
    var status = 200
    const id = req.params.id;
    await bookIssue.destroy({ 
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


router.patch("/edit/:id", async function(req, res){

  try {

    var success = true
    var message = "edit success"
    var status = 200
    var transaction = null

      const id = req.params.id
      const { 
        roleId,
        bookId,
        bookCategoryId,
        userId,
        dateOfExpiry
      } = await req.body;
      transaction = await models.sequelize.transaction()
      await bookIssue.update({ 
        roleId,
        bookId,
        bookCategoryId,
        userId,
        dateOfExpiry: moment(dateOfExpiry).format('YYYY-MM-DD')
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
        console.log(chalk.red.bold("im from first inner catch",err.message))
      })
      if(!success) {
        await transaction.rollback()
      }else {
        await transaction.commit()
      }   
  }catch (err) {
    success = false
    message = "edit fail"
    status = 400
    console.log(err);
  };
  res.status(status).json({
    success,
    message
  })
});

module.exports = router;

