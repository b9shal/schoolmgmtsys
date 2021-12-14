const { Router  } = require('express')
const router = Router()
const chalk = require('chalk');
const { body, validationResult} = require('express-validator');
const models = require('../models')
const { feeGroup, feeType } = require("../models")
const moment = require('moment');


const validate = [
    body("groupName")
    .isString()
    .withMessage("group name should be a string")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("group name should be atleast 1 char and atmost 20 chars long"),
    body("description")
    .isString()
    .withMessage("description should be a string")
    .trim()
    .isLength({ max: 255 })
    .withMessage("description should be atmost 255 chars long"),
    body("feeTypes")
    .isArray({ min: 1 })
    .withMessage("fee group should have atleast one fee type")
]

router.get('/list', async function (req, res) {
    try {
        var success = true
        var status = 200
        var message = 'list success'
        const data = await models.feeTypeFeeGroup.findAll({
            attributes: ["dueDate", "amount"],
            include: [
                { model: feeType, attributes: ["name"] },
                { model: feeGroup, attributes: ["id", "groupName", "description"] }
            ]
        })
        res.status(status).json({
            message,
            success,
            data
        })
    } catch (err) {
        success = false
        status = 400
        message = "list fail"
        res.status(status).json({
            message,
            success
        })
        console.log(chalk.red.bold(err.message))
    }
})


router.post('/add', validate, async function (req, res) {
    try {
        var success = true
        var status = 200
        var message = 'add success'
        var transaction = ''
        var validationError = null
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            message = "add fail"
            status = 400
            success = false
            validationError = []
            errors.array().forEach(val => {
              validationError.push({
                param: val.param,
                message: val.msg
              })
            })
          }else {
              const { 
                  groupName, 
                  description, 
                  feeTypes
                } = await req.body
            transaction = await models.sequelize.transaction()
            const { id } = await feeGroup.create({
                groupName,
                description
            },
            {
                transaction
            }).catch(err => {
                message = "add fail"
                status = 400
                success = false
                console.log(chalk.red.bold(err.message))
            })

            if(!success){
                await transaction.rollback()
            }else {

                let feeTypeFeeGroupCollection = []
                feeTypes.forEach(val => {
                    feeTypeFeeGroupCollection.push({
                        feeGroupId: id,
                        feeTypeId: val.feeTypeId,
                        dueDate: val.dueDate,
                        amount: val.amount,
                        createdAt: new Date,
                        updatedAt: new Date
                    }) 
                })
                
                await models.sequelize.queryInterface
                .bulkInsert(models.feeTypeFeeGroup.getTableName(),
                feeTypeFeeGroupCollection,
                { 
                    transaction 
                }).catch(err => {
                    success = false
                    message = "add fail"
                    status = 400
                    console.log(chalk.red.bold(err.message))
                })
                
                if(!success) {
                    await transaction.rollback()
                }else {
                    await transaction.commit()
                }
            }
        }
    } catch (err) {
        message = "add fail"
        status = 400
        success = false
        console.log(chalk.red.bold(err.message))
    }
    res.status(status).json({
        success,
        message,
        validationError
    })
})


router.patch('/edit/:id', validate, async function (req, res) {
    try {
        var id = req.params.id
        var success = true
        var message = 'edit success'
        var status = 200
        var validationError = null
        var transaction = null
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            validationError = []
            success = false
            message = "edit fail"
            status = 500
            errors.array().forEach(val => {
                validationError.push({
                    param: val.param,
                    message: val.msg
                })
            });
        } else {
            transaction = await models.sequelize.transaction()
            await feeGroup.update({ groupName: req.body.groupName, description: req.body.description },{
                where: {
                    id
                }
            },{ transaction }).catch(err => {
                success = false
                message = "edit fail"
                status = 500
                console.log(err.message)
            })
        }
        if(!success) {
            console.log("ddasdlfjlkajsdfkjakjkjkjasdfl")
            await transaction.rollback()
        }else {
            await models.feeTypeFeeGroup.destroy({
                where: {
                    feeGroupId: id
                }
            })

            let feeTypeFeeGroupCollection = []
            req.body.feeTypes.forEach(val => {
                feeTypeFeeGroupCollection.push({
                    feeGroupId: req.params.id,
                    feeTypeId: val.feeTypeId,
                    dueDate: val.dueDate,
                    amount: val.amount,
                    createdAt: new Date,
                    updatedAt: new Date
                }) 
            })

            await models.sequelize.queryInterface
                .bulkInsert(models.feeTypeFeeGroup.getTableName(),
                feeTypeFeeGroupCollection,
                { 
                    transaction 
                }).catch(err => {
                    success = false
                    message = "add fail"
                    status = 400
                    console.log(chalk.red.bold(err.message))
                })

            if(success){
                console.log("first commitccccccccccccccccccccccccc")
                await transaction.commit() 
            }else {
                console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
                await transaction.rollback()
            }
        }
    } catch (err) {
        success = false
        status = 500
        message = "edit fail"
        console.log(chalk.red.bold("feeGroup.js ", err.message))
    }
    res.status(status).json({
        success,
        message,
        validationError
    })
})

router.delete('/delete/:id', async function (req, res) {
    try {
        var message = 'delete success'
        var success = true
        var status = 200
        var transaction = await models.sequelize.transaction()
        const id = req.params.id
        await feeGroup.destroy({
            where: {
                id
            }
        }, { transaction})
        .catch(err => {
            success = false
            status = 500
            message = "delete fail"
        })
        if(success) {
            await models.feeTypeFeeGroup.destroy({
                where : {feeGroupId: id}
            })
            await transaction.commit()
        }else {
            await transaction.rollback()
        }
    } catch (err) {
        success = false
        message = 'delete fail'
        console.log(chalk.red.bold("feeGroup ", err.message))
    }
    res
    .status(status)
    .json({
        message, 
        success
    })
})


module.exports = router