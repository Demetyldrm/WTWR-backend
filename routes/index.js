const router = require("express").Router();
const userRouter = require("./users.js");
const clothingItem = require("./clothingItems.js");

const { NOT_FOUND } = require("../utils/errors.js");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested router not found" });
});

module.exports = router;
