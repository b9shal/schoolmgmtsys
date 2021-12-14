const saltRounds = 10;
const chalk = require('chalk')
const jwt = require('jsonwebtoken')


module.exports = {
    isAuthenticate: async (req, res, next) => {
        try {
            //use to encode token
           /* var token = await jwt.sign({
                data: user
            }, process.env.API_SECRET, { expiresIn: '1d' });*/

            // console.log('req header ', req.headers)
            var authKey = req.headers.authorization
            if (authKey) {
                authKey = authKey.split(' ')
                var token = authKey[1]
                await jwt.verify(token, process.env.API_SECRET, function(err, decoded) {
                    if(err){
                        console.log(chalk.red.bold("auth.js 12 ", err.message))
                        res.status(401).json({
                            success : false,
                            msg:'Auth failed'
                        })
                    }

                    if(decoded){
                        // console.log('decoded  ',decoded)
                        next()
                    }
                });

            }else{
                res.status(401).json({
                    success : false,
                    msg : 'Auth failed'
                })
            }
            /*  await jwt.verify(req.header, process.env.INVENTORY_SECRET, function(err, decoded) {
                  if(err){
                      console.log(chalk.red.bold("auth.js 12 ",err.message))
                      res.status(401).send({
                          msg:'Auth failed'
                      })
                  }

                  if(decoded){
                      console.log('decoded  ',decoded)
                      next()
                  }
              });
  */

        } catch (err) {
            console.log(chalk.red.bold("auth.js 13 ", err.message))
            res.status(401).send({
                msg: 'Auth failed',
                success: false
            })
        }

    }
}