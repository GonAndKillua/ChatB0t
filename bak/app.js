const express = require("express");
const cors = require("cors");
const AuthRoute = require("./routes/authroute");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", AuthRoute);

app.listen(process.env.PORT, () => {
  console.log("server started");
});
