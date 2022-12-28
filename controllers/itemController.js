const Item = require("../models/item");
const Category = require("../models/category");

const async = require("async");

exports.item_list = (req, res) => {
  res.send("Item List");
};

exports.item_detail = (req, res) => {
  res.send(`Item Detail: ${req.params.id}`);
};

exports.item_create_get = (req, res) => {
  res.send("Create Item GET");
};

exports.item_create_post = (req, res) => {
  res.send("Create Item POST");
};

exports.item_update_get = (req, res) => {
  res.send("Update Item GET");
};

exports.item_update_post = (req, res) => {
  res.send("Update Item POST");
};

exports.item_delete_get = (req, res) => {
  res.send("Delete item GET");
};

exports.item_delete_post = (req, res) => {
  res.send("Delete Item POST");
};
