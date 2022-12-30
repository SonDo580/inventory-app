const Category = require("../models/category");

exports.category_list = (req, res, next) => {
  Category.find((err, result) => {
    if (err) {
      return next(err);
    }

    res.render("category_list", {
      title: "Category List",
      categories: result,
    });
  });
};

exports.category_create_get = (req, res) => {
  res.render("category_form", {
    title: "Create Category",
    category: undefined,
  });
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
