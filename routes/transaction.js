const express = require("express");
const router = express.Router();
const { expense, deposit, account, voucherHead } = require("../models");


router.get("/list", async function(req, res) {

  try {

    var success = true
    var message = "add success"
    var status = 200
    
    var deposits = await deposit.findAll({
      attributes: ["id", "ref", "amount", "description", "payVia", "date"],
      include: [
      { model: account, attributes: ["accountName"] },
      { model: voucherHead, attributes: ["voucherName"] }
      ]
    })
    var expenses = await expense.findAll({
      attributes: ["id", "ref", "amount", "description", "payVia", "date"],
      include: [
        { model: account, attributes: ["accountName"] },
        { model: voucherHead, attributes: ["voucherName"] }
      ]
    })
    
  }catch (err) {
    success = false
    message = "add fail"
    status = 400
    console.log(err)
  };
  res.status(status).json({
    success,
    message,
    deposits,
    expenses
  })
})

module.exports = router