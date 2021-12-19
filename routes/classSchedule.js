const express = require("express");
const router = express.Router();
const { lessonPlanning, classRoom, section, subject, employee  } = require("../models");


router.get("/list", async function(req, res) {

  try {

    var success = true
    var message = "add success"
    var status = 200
    
    console.log(parseInt(req.query.teacherId))
    const classRoomId = await parseInt(req.query.classId)
    const sectionId = await parseInt(req.query.sectionId)
    const data = await lessonPlanning.findAll({ 
      where: { classRoomId, sectionId },
      attributes: ["startDate", "endDate"],
      include: [{
        model: employee, attributes: ["name"]
      },
      {
        model: classRoom, attributes: ["className"]
      }
      ,
      {
        model: section, attributes: ["sectionName"]
      }
      ,
      {
        model: subject, attributes: ["subjectName"]
      }],
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