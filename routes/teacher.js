const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const { employee, role } = require("../models");


router.get("/list", async function(req, res) {

  try {

    var success = true
    var message = "add success"
    var status = 200

    const data = await employee.findAll({
      attributes: ["id", "name"],
      include: [{
        model: role, where: { type: "Teacher" }, attributes: []
      }]
    })
    res.status(status).json({
      success,
      message,
      data
    })

  }catch (err) {
    success = false
    message = "add fail"
    status = 400
    console.log(err);

    res.status(status).json({
      success,
      message
    })
  };
});

module.exports = router