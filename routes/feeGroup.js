var express = require('express')
var router = express.Router()
const chalk = require('chalk');
const {check, body, validationResult} = require('express-validator');
const models = require('../models')
const moment = require('moment')


router.get('/', async function (req, res) {
    try {
        console.log('in fee group')


    } catch (err) {
        console.log(chalk.red.bold("feeGroup 10 ", err.message))
    }
    res.send({
        msg:'my school'
    })
})

router.get('/list', async function (req, res) {
    try {
        var breadCrum = ['Country', 'List']


    } catch (err) {
        console.log(chalk.red.bold("feeGroup 10 ", err.message))
    }
    res.send({
        msg:'my school'
    })
})

// define the home page route
router.get('/add',[
    /*check('groupName')
        .isLength({ min: 1 })
        .withMessage('name can not be empty !!!')*/
] ,async function (req, res) {
    try {
        var success = true
        var status = 200
        var customError = false
        var transaction = ''
        var msg = 'Successfully added !!!'
        console.log("..................... req body ",req.body)

        const errors = validationResult(req);
        var validationError = null
        if (!errors.isEmpty()) {
            validationError = errors.array()
            success = false
        }else{

            transaction = await models.sequelize.transaction()

            var feeGroup = await models.feeGroup.create({
                groupName: 'my g roup',
                description: 'this is first group',
            },{transaction}).catch(err =>{
                success = false
                console.log(chalk.red.bold("feeGroup.js 47 ",err.message))
            })
            var feeTypesFeeGroupCollection = []
            //data to be send should be in this format
            var data = `[
            {"feeTypeId":"1","feeGroupId":"1","due":"2021-11-15","amount":"2000"},
            {"feeTypeId":"2","feeGroupId":"1","due":"2021-11-16","amount":"5000"}
            ]`
            // console.log('')
            // for(var)
            for(var i of JSON.parse(data)){
                console.log(".......... i ",i)
                console.log('....... fee pre ',i.feeTypeId)

                feeTypesFeeGroupCollection.push({
                    feeTypeId: i.feeTypeId,
                    feeGroupId: feeGroup.id,
                    dueDate: moment(i.due,'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss'),
                    amount: i.amount,
                    createdAt: new Date,
                    updatedAt : new Date
                })
            }
            console.log("........... collection ",feeTypesFeeGroupCollection)

            await models.sequelize.queryInterface.bulkInsert(models.feeTypeFeeGroup.getTableName(),
                feeTypesFeeGroupCollection
                , {transaction}).catch(err => {
                success = false
                console.log(chalk.red.bold("purchase.js 152 ", err.message))
            })
            // success = false
            if(!success){
                transaction.rollback()
            }else{
                transaction.commit()
            }

        }
        if(!success){
            msg = 'Opps!!!,Something went wrong'
        }


    } catch (err) {
        transaction.rollback()
        msg = 'Opps!!!,Something went wrong'
        console.log(chalk.red.bold("feeGroup 10 ", err.message))
    }
    res.send({
        success : success,
        msg: msg,
        validationError:validationError
    })
})

router.get('/add', async function (req, res) {
    try {
        var breadCrum = ['Country', 'Add']



    } catch (err) {
        console.log(chalk.red.bold("feeGroup 10 ", err.message))
    }
    res.json({
        msg:1
    })



})

router.post('/add', [
        check('name')
            .isLength({min: 1})
            .withMessage('must be at least 1 chars long')
        // .matches(/\d/)
        // .withMessage('must contain a number'),
    ]
    , async function (req, res) {
        try {
            var breadCrum = ['Country', 'Add']
            var success = true
            var msgType = 'success'
            var msg = req.t('msg_add_success')
            console.log("..................... req body ", req.body)

            const errors = validationResult(req);
            var validationError = null
            if (!errors.isEmpty()) {
                validationError = errors.array()
                success = false
            } else {

            }
            if (!success) {
                msg = req.t("msg_add_fail")
                console.log(req.t('msg_add_fail'), ' checked msg ')
                msgType = 'warn'
            }


        } catch (err) {
            success = false
            msgType = 'warn'
            msg = req.t("msg_catch_error")
            console.log(chalk.red.bold("feeGroup 91 ", err.message))
        }
        res.send({
            title: 'form validation',
            msg: msg,
            success: success,


            validationError: validationError,
            msgType: msgType
        });


    })

router.get('/edit/:id', async function (req, res) {
    try {
        var breadCrum = ['Country', 'EDIT']

    } catch (err) {
        console.log(chalk.red.bold("feeGroup.js ", err.message))
    }
    res.json({
        msg:1
    })
})
router.post('/edit/:id', [check('name').isLength({min: 1}).withMessage('name can not be empty !!!'),], async function (req, res) {
    try {
        var success = true
        var validationError
        var msg = req.t('msg_update_success')
        var msgType = 'success'
        console.log("$$$$$$$$$$$$$$$$$$$$ req body ", req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            validationError = errors.array()
            success = false
        } else {

        }
        if (!success) {
            msgType = 'warn'
            msg = req.t('msg_update_fail')
        }
    } catch (err) {
        success = false
        msg = req.t('msg_catch_error')
        msgType = 'warn'
        console.log(chalk.red.bold("feeGroup.js ", err.message))
    }
    res.json({success: success, msg: msg, msgType: msgType, validationError: validationError})
})

router.get('/delete/:id', async function (req, res) {
    try {
        var msg = req.t('msg_delete_success')
        var msgType = 'success'
        var success = true /* * validate check in order transaction * */

        if (!success) {
            msgType = 'warn'
            msg = req.t('msg_delete_fail')
        }
    } catch (err) {
        success = false
        msg = req.t('msg_catch_error')
        msgType = 'warn'
        console.log(chalk.red.bold("feeGroup ", err.message))
    }
    res.json({msg: msg, msgType: msgType, success: success})
})


module.exports = router