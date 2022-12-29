const Item = require("../models/item");
const Category = require("../models/category");

const async = require("async");
const { body, validationResult } = require("express-validator");

exports.item_list = (req, res, next) => {
  const categoryNeeded = req.query.category;

  async.parallel(
    {
      categories(callback) {
        Category.find({}, "name").exec(callback);
      },
      items(callback) {
        if (categoryNeeded === undefined) {
          Item.find().exec(callback);
        } else {
          Item.find({ category: categoryNeeded }).exec(callback);
        }
      },
    },

    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render("item_list", {
        title: "Item List",
        categories: results.categories,
        items: results.items,
      });
    }
  );
};

exports.item_detail = (req, res, next) => {
  async.parallel(
    {
      categories(callback) {
        Category.find({}, "name").exec(callback);
      },
      item(callback) {
        Item.findById(req.params.id).exec(callback);
      },
    },

    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render("item_detail", {
        title: "Item Detail",
        categories: results.categories,
        item: results.item,
      });
    }
  );
};

exports.item_create_get = (req, res, next) => {
  Category.find({}, "name").exec((err, result) => {
    if (err) {
      return next(err);
    }

    res.render("item_form", {
      title: "Create Item",
      categories: result,
    });
  });
};

exports.item_create_post = [
  // Validate and sanitize input
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty").trim().isLength({ min: 1 }).escape(),
  body("number", "Number-in-stock must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
];

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
