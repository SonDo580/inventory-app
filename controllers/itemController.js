const Item = require("../models/item");
const Category = require("../models/category");

const async = require("async");
const category = require("../models/category");

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
