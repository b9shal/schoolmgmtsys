const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const feeTypeRoute = require("./routes/feesRoute");
const feeGroupRoute = require("./routes/feeGroup");
const inventoryRoute = require("./routes/inventoryRoute");

let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json({ extended: true }));

dotenv.config();

const PORT = process.env.PORT || 5004;

//routes
app.use("/api/feeGroup", feeGroupRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/feeType", feeTypeRoute);


/*
app.listen(PORT, async () => {
  // await sequelize.authenticate();
  console.log(`server running at ${PORT}`);
  console.log("Database connected and running");
});*/

app.use((error,req,res,next)=>{
  res.status(error.status ||  500);
  // res.json({
  //     error:{
  //         message: error.message,
  //         status : error.status
  //     }
  // })
  // if(error.errorCode || error.message == "Error checking permissions to access resource"){
  //   //    acl redirect with message
  //   res.render('error/aclError',{layout:"login",title:"Home",message:error.message,errorCode:error.status,errorCodeAcl:error.errorCode});
  // }else{
  //   res.render('error/404',{title:"Home",message:error.message,errorCode:error.status,errorCodeAcl:error.errorCode});
  // }

});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))