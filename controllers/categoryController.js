const Category = require("../models/category");
const Item = require("../models/item");

const { body, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const async = require("async");

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
    errors: undefined,
  });
};

exports.category_create_post = [
  // Validate and sanitize input
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req);

    // Create new category with sanitized input
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    // Render the form again if there are errors
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    }

    // Save category if data is valid
    category.save((err) => {
      if (err) {
        return next(err);
      }

      // Redirect to category list page
      res.redirect("/category");
    });
  },
];

exports.category_update_get = (req, res, next) => {
  Category.findById(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }

    res.render("category_form", {
      title: "Update Category",
      category: result,
      errors: undefined,
    });
  });
};

exports.category_update_post = [
  // Validate and sanitize input
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req);

    // Create new category with sanitized input
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id, // This is necessary: use the same _id property
    });

    // Render the form again if there are errors
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Update Category",
        category: category,
        errors: errors.array(),
      });
      return;
    }

    // Update category if data is valid
    Category.findByIdAndUpdate(
      req.params.id,
      category,
      {},
      (err, updatedCategory) => {
        if (err) {
          return next(err);
        }

        // Redirect to category list page
        res.redirect("/category");
      }
    );
  },
];

exports.category_delete_post = (req, res, next) => {
  if (req.body.adminPass !== process.env.ADMIN_PASS) {
    return res.redirect("/category");
  }

  async.series(
    [
      function (callback) {
        Item.deleteMany({
          category: mongoose.Types.ObjectId(req.params.id),
        }).exec(callback);
      },
      function (callback) {
        Category.findByIdAndRemove(req.params.id).exec(callback);
      },
    ],
    (err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/category");
    }
  );
};
