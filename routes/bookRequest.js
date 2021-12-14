const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { bookRequest, book} = require("../models");
const models = require("../models")

router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await bookRequest.findAll({
      include: [
        {
          model: book, attributes: ["title", "author", "isbn", "edition", "publisher"]
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


//route to add a vendor
router.post("/add", async function(req, res) {

  try {
  var success = true
  var message = "add success"
  var status = 200
  var transaction = null


  const { 
    bookId,
    dateOfExpiry,
    dateOfIssue
  } = await req.body;
  transaction = await models.sequelize.transaction()
  await bookRequest.create({ 
    bookId,
    dateOfExpiry,
    dateOfIssue
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
    await bookRequest.destroy({ 
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
        bookId,
        dateOfExpiry,
        dateOfIssue
      } = await req.body;
      transaction = await models.sequelize.transaction()
      await bookRequest.update({ 
        bookId,
        dateOfExpiry,
        dateOfIssue
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
    message,
  })
});

module.exports = router;

