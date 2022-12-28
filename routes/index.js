const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.redirect("/item");
});

module.exports = router;
