const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.get("/", itemController.item_list);

router.get("/create", itemController.item_create_get);

router.post("/create", itemController.item_create_post);

router.get("/:id/update", itemController.item_update_get);

router.post("/:id/update", itemController.item_update_post);

router.post("/:id/delete", itemController.item_delete_post);

router.get("/:id", itemController.item_detail);

module.exports = router;
