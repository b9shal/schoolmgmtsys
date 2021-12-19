const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const feeTypeRoute = require("./routes/feeType")
const feeGroupRoute = require("./routes/feeGroup")
const vendorRoute = require("./routes/vendor");
const itemRoute = require("./routes/item");
const itemCategoryRoute = require("./routes/itemCategory");
const fineRoute = require("./routes/fine");
const feeReminderRoute = require("./routes/feeReminder");
const stockRoute = require("./routes/stock");
const accountRoute = require("./routes/account");
const voucherHeadRoute = require("./routes/voucherHead");
const expenseRoute = require("./routes/expense");
const depositRoute = require("./routes/deposit");
const transactionRoute = require("./routes/transaction");
const guardianRoute = require("./routes/guardian");
const studentCategoryRoute = require("./routes/studentCategory");
const admissionRoute = require("./routes/admission");
const classRoute = require("./routes/classRoom");
const sectionRoute = require("./routes/section");
const userRoute = require("./routes/user");
const hostelRoute = require("./routes/hostel");
const hostelCategoryRoute = require("./routes/hostelCategory");
const hostelRoomRoute = require("./routes/hostelRoom");
const vehicleRoute = require("./routes/vehicle");
const vehicleRouteRoute = require("./routes/vehicleRoute");
const stoppageRoute = require("./routes/stoppage");
const vehicleAssignRoute = require("./routes/vehicleAssign");
const studentRoute = require("./routes/student");
const bookRoute = require("./routes/book");
const bookCategoryRoute = require("./routes/bookCategory");
const bookRequestRoute = require("./routes/bookRequest");
const bookIssueRoute = require("./routes/bookIssue");
const roleRoute = require("./routes/role");
const departmentRoute = require("./routes/department");
const designationRoute = require("./routes/designation");
const subjectRoute = require("./routes/subject");
const classAssignRoute = require("./routes/classAssign");
const assignClassTeacherRoute = require("./routes/assignClassTeacher");
const teacherRoute = require("./routes/teacher");
const lessonPlanningRoute = require("./routes/lessonPlanning");
const teacherScheduleRoute = require("./routes/teacherSchedule");
const classScheduleRoute = require("./routes/classSchedule");
const auth = require('./middleware/auth')

let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};

const app = express()
app.use(cors(corsOptions))
app.use(express.json({ extended: true }))

dotenv.config();
const PORT = process.env.PORT || 5004;

app.use(express.static(`${__dirname}/public`))


//routes
app.use("/api/user", userRoute);
app.use("/api/feeGroup", feeGroupRoute);
app.use("/api/feeType", feeTypeRoute);
app.use("/api/item", itemRoute);
app.use("/api/vendor", vendorRoute);
app.use("/api/itemCategory", itemCategoryRoute);
app.use("/api/fine", fineRoute);
app.use("/api/feeReminder", feeReminderRoute);
app.use("/api/stock", stockRoute);
app.use("/api/account", accountRoute);
app.use("/api/voucherHead", voucherHeadRoute);
app.use("/api/expense", expenseRoute);
app.use("/api/deposit", depositRoute);
app.use("/api/guardian", guardianRoute);
app.use("/api/studentCategory", studentCategoryRoute);
app.use("/api/admission", admissionRoute);
app.use("/api/class", classRoute);
app.use("/api/section", sectionRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/hostel", hostelRoute);
app.use("/api/hostelCategory", hostelCategoryRoute);
app.use("/api/hostelRoom", hostelRoomRoute);
app.use("/api/vehicleRoute", vehicleRouteRoute);
app.use("/api/vehicle", vehicleRoute);
app.use("/api/stoppage", stoppageRoute);
app.use("/api/vehicleAssign", vehicleAssignRoute);
app.use("/api/student", studentRoute);
app.use("/api/book", bookRoute);
app.use("/api/bookCategory", bookCategoryRoute);
app.use("/api/bookRequest", bookRequestRoute);
app.use("/api/bookIssue", bookIssueRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/department", departmentRoute);
app.use("/api/designation", designationRoute);
app.use("/api/assignClassTeacher", assignClassTeacherRoute);
app.use("/api/classAssign", classAssignRoute);
app.use("/api/role", roleRoute);
app.use("/api/lessonPlanning", lessonPlanningRoute);
app.use("/api/teacherSchedule", teacherScheduleRoute);
app.use("/api/classSchedule", classScheduleRoute);
app.use(auth.isAuthenticate)


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