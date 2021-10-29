require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
//for handlebars
const path = require('path');
const app = express();
var cors = require('cors');
// var auth = require('./middleware/auth')
// const acl = require('express-acl');
//
// let configObject = {
//     filename: 'nacl.json',
//     path: 'lib',
//     decodedObjectName: 'user',
//     denyCallback: (res) => {
//         return res.status(403).json({
//             status: 'Access Denied',
//             success: false,
//             message: 'You are not authorized to access this resource'
//         });
//     }
// };
//
// acl.config(configObject);



app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





app.use(express.static(path.join(__dirname,'public')));

const port = 3000

//other module


var countryRoutes = require('./routes/country')





// app.use(auth.isAuthenticate)

// app.use(acl.authorize);


app.use('/country', countryRoutes)








//handle error route
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;

    next(error);
});

//operation fail in db
app.use((error,req,res,next)=>{
    res.status(error.status ||  500);
    // res.json({
    //     error:{
    //         message: error.message,
    //         status : error.status
    //     }
    // })
    if(error.errorCode || error.message == "Error checking permissions to access resource"){
        //    acl redirect with message
        // res.render('error/aclError',{layout:"login",title:"Home",message:error.message,errorCode:error.status,errorCodeAcl:error.errorCode});
        res.send({
            message:error.message,
            errorCOde: error.status
        })
    }else{
        res.send({
            message:error.message,
            errorCOde: error.status
        })
        // res.render('error/404',{title:"Home",message:error.message,errorCode:error.status,
        // errorCodeAcl:error.errorCode});
    }

});

app.listen(port, () => console.log(`App listening on port ${port}!`))
