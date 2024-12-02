const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const { errorHandler } = require("./middlewares/error-handler");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

app.use(express.json());
app.use(cors());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
