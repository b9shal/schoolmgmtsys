var express = require('express')
var router = express.Router()
const chalk = require('chalk');
const {check, body, validationResult} = require('express-validator');

const models = require('../models')



router.get('/', async function (req, res) {
    try {
        var breadCrum = ['Country', 'List']


    } catch (err) {
        console.log(chalk.red.bold("country.js 10 ", err.message))
    }
    res.send({
        msg:'my school'
    })
})

// define the home page route
router.get('/list', async function (req, res) {
    try {
        var breadCrum = ['Country', 'List']


    } catch (err) {
        console.log(chalk.red.bold("country.js 10 ", err.message))
    }
    res.send({
        msg:'school list'
    })


    req.session.msg = null
    req.session.success = null
    req.session.errors = null
})

router.get('/add', async function (req, res) {
    try {
        var breadCrum = ['Country', 'Add']



    } catch (err) {
        console.log(chalk.red.bold("country.js 10 ", err.message))
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
            console.log(chalk.red.bold("country.js 91 ", err.message))
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
        console.log(chalk.red.bold("country.js.js ", err.message))
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
        console.log(chalk.red.bold("country.js.js ", err.message))
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
        console.log(chalk.red.bold("country.js ", err.message))
    }
    res.json({msg: msg, msgType: msgType, success: success})
})


module.exports = router