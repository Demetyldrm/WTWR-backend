const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/clothingItems");
const mainRouter = require("./routes/index");
const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
  req.user = {
    _id: "6701f27dec83adb0537c497f",
  };
  next();
});

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

app.use("./", routes);
app.use("/", mainRouter);
