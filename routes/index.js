const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItems");
const { login, createUser } = require("../controllers/users");

const {
  validateUserLogin,
  validateUserInfo,
} = require("../middlewares/validation");

const { NOT_FOUND } = require("../utils/errors");

router.post("/signup", validateUserInfo, createUser);
router.post("/signin", validateUserLogin, login);
router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res, next) => {
  next(new NOT_FOUND("Router not found"));
});

module.exports = router;
