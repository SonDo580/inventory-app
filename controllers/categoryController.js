const Category = require("../models/category");

const { body, validationResult } = require("express-validator");

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
