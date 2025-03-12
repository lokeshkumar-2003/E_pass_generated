const express = require("express");
const DBConnection = require("./dbConfig.js");
const cors = require("cors");
const epassRoute = require("./routes/ePassRoutes.js");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { PORT } = process.env;
console.log(PORT);
app.use(
  cors({
    credentials: true,
  })
);

app.use("/api", epassRoute);
app.listen(PORT, () => {
  DBConnection();
});
