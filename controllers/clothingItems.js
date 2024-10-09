const ClothingItem = require("../models/clothingItem.js");

const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} = require("../utils/errors.js");

const createItem = async (req, res) => {
  console.log(req);
  console.log(req.body);

  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  try {
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    res.status(201).send({ data: item });
  } catch (err) {
    console.error("Error:", err);
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).send({ message: err.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: "An error has occurred on the server " });
  }
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server " });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then(() => ClothingItem.deleteOne({ _id: itemId }))
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server " });
    });
};

const likeItem = (req, res) => {
  console.log(req.params.itemId);

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server " });
    });
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then(() => res.status(200).send({ message: "unlike successfully" }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server " });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
