const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItems");

const { NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested router not found" });
});

module.exports = router;
