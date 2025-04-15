const express = require("express");
const router = express.Router();
const phoneController = require("../controllers/phone.controller");

router.get("/", phoneController.getPhoneItems);
router.delete("/:id", phoneController.deletePhoneItem);
router.get("/:id/edit", phoneController.showEditForm);
router.put("/:id/edit", phoneController.editItem);

module.exports = router;
