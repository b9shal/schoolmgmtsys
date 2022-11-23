const chalk = require('chalk')
const jwt = require('jsonwebtoken')

module.exports = {
    isAuthenticate: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization
            if (authHeader && authHeader.startsWith("Bearer")) {
                const token = authHeader.split(' ')[1]
                const decoded = await jwt.verify(token, process.env.API_SECRET)

                if(decoded){
                    next()
                }                                                                                                                                                                                                                                      
            }else {
                res.status(401).json({
                    success : false,
                    msg : 'Auth failed'
                })
            }
        } catch (err) {
            console.log(chalk.red.bold("auth.js 13 ", err.message))
            res.status(401).send({
              msg: "Auth failed for this user",
              success: false,
            });
        }

    }
}