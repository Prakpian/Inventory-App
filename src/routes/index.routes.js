const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");

router.get("/:category", itemsController.getItems);
router.get("/:category/:id/edit", itemsController.showEditForm);
router.put("/:category/:id/edit", itemsController.editItem);
router.delete("/:category/:id", itemsController.deleteAItem);

module.exports = router;
