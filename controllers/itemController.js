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
      category(callback) {
        Category.findById(categoryNeeded).exec(callback);
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

      if (results.category === null) {
        const err = new Error("Category not found");
        err.status = 404;
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

      if (results.item === null) {
        const err = new Error("Item not found");
        err.status = 404;
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
      item: undefined,
      errors: undefined,
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
  body("number")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Number-in-stock must not be empty")
    .isInt()
    .withMessage("Number-in-stock must be an integer"),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req);

    // Create new item with sanitized input
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number: req.body.number,
    });

    // Render the form again if there are errors
    if (!errors.isEmpty()) {
      Category.find({}, "name").exec((err, result) => {
        if (err) {
          return next(err);
        }

        res.render("item_form", {
          title: "Create Item",
          categories: result,
          item: item,
          errors: errors.array(),
        });
      });
      return;
    }

    // Save item if data is valid
    item.save((err) => {
      if (err) {
        return next(err);
      }

      // Redirect to item detail page
      res.redirect(item.url);
    });
  },
];

exports.item_update_get = (req, res, next) => {
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

      if (results.item === null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }

      res.render("item_form", {
        title: "Update Item",
        categories: results.categories,
        item: results.item,
        errors: undefined,
      });
    }
  );
};

exports.item_update_post = [
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
  body("number")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Number-in-stock must not be empty")
    .isInt()
    .withMessage("Number-in-stock must be an integer"),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req);

    // Create new item with sanitized input
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number: req.body.number,
    });

    // Render the form again if there are errors
    if (!errors.isEmpty()) {
      Category.find({}, "name").exec((err, result) => {
        if (err) {
          return next(err);
        }

        res.render("item_form", {
          title: "Create Item",
          categories: result,
          item: item,
          errors: errors.array(),
        });
      });
      return;
    }

    // Save item if data is valid
    item.save((err) => {
      if (err) {
        return next(err);
      }

      // Redirect to item detail page
      res.redirect(item.url);
    });
  },
];

exports.item_delete_post = (req, res) => {
  res.send("Delete Item POST");
};
