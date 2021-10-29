const saltRounds = 10;
const chalk = require('chalk')
const jwt = require('jsonwebtoken')


module.exports = {
    isAuthenticate: async (req, res, next) => {
        try {

            req.user = {
                role:'admin'
            }

            next()
            /*var authKey = req.headers.authorization
            if (authKey) {
                authKey = authKey.split(' ')
                var token = authKey[1]
                await jwt.verify(token, process.env.INVENTORY_SECRET, function(err, decoded) {
                    if(err){
                        console.log(chalk.red.bold("auth.js 16 ",err.message))
                        res.status(401).send({
                            success : false,
                            msg:'Auth failed'
                        })
                    }

                    if(decoded){
                        next()
                    }
                });

            }else{
                res.status(401).send({
                    success : false,
                    msg : 'Auth failed'

                })
            }*/


        } catch (err) {
            console.log(chalk.red.bold("auth.js 13 ", err.message))
            res.status(401).send({
                msg: 'Auth failed',
                success: false
            })
        }

    }
}