require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const util = require("util");
const cors = require("cors");
const jsonMiddleware = require("./middleware/jsonMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const sendOtp = require("./routes/sendOtp");
const verifyOtp = require("./routes/verifyOtp");
const register = require("./routes/register")
const logOut = require("./routes/logOut");
const myprofile = require('./routes/myProfile');
const contactUs = require('./routes/contactus');
const softwareDeployment = require('./routes/softwareDeployment');
const softwareproductservice = require('./routes/softwareproductservice');
const payment = require('./routes/payment')
const user = require('./routes/users')
const servicePayments = require('./routes/servicepayments')

const app = express();
const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db2 = mysql.createConnection({
    host: process.env.DB_HOST_2,
    user: process.env.DB_USER_2,
    password: process.env.DB_PASSWORD_2,
    database: process.env.DB_NAME_2
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to Software DB: ", err);
    return;
  }
  console.log("Connected to Software DB");
});

db2.connect(err => {
    if(err) {
      console.error('Error connecting to Broker DB:', err);
      return;
    }
    console.log('Connected to Broker DB');
});

db.query = util.promisify(db.query);
db2.query = util.promisify(db2.query);

app.use(cors());
app.use(jsonMiddleware);

// Public Routes
app.use("/api", sendOtp(db));
app.use("/api", verifyOtp(db));
app.use("/api", register(db));
app.use("/api", contactUs(db));
app.use("/api", softwareDeployment(db));
app.use("/api", payment(db));
app.use("/api", softwareproductservice(db2));
app.use("/api", user(db2));
app.use("/api", servicePayments(db2));

app.use("/api", authMiddleware(db), logOut(db));
app.use('/api', authMiddleware(db), myprofile(db))

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
