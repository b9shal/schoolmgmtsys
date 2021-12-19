const express = require("express");
const router = express.Router();
const { student, admission, guardian, section, classRoom } = require("../models");

router.get("/list", async function(req, res){

  try {
    var success = true
    var message = "list success"
    var status = 200
    const data = await student.findAll({
      attributes: ["id", "createdAt", "updatedAt"],
      include:[
        { model: admission, attributes: ["firstName", "middleName", "lastName", "registerNo", "roll", "dob"] },
        { model: guardian, attributes: ["name"] },
        { model: section, attributes: ["sectionName"] },
        { model: classRoom, attributes: ["className"] },
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

module.exports = router