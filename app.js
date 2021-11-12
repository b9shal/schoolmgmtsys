const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require ("./models/index.js");
const feesRoute = require ("./routes/feesRoute.js");

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
app.use("/api/fee", feesRoute);


app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`server running at ${PORT}`);
  console.log("Database connected and running");
});