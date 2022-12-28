const Category = require("../models/category");

exports.category_list = (req, res) => {
  res.send("Category List");
};

exports.category_detail = (req, res) => {
  res.send(`Category Detail: ${req.params.id}`);
};

exports.category_create_get = (req, res) => {
  res.send("Create Category GET");
};

exports.category_create_post = (req, res) => {
  res.send("Create Category POST");
};

exports.category_update_get = (req, res) => {
  res.send("Update Category GET");
};

exports.category_update_post = (req, res) => {
  res.send("Update Category POST");
};

exports.category_delete_get = (req, res) => {
  res.send("Delete Category GET");
};

exports.category_delete_post = (req, res) => {
  res.send("Delete Category POST");
};
