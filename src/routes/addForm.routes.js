const express = require("express");
const router = express.Router();
const formController = require("../controllers/addForm.controller");

router.get("/", formController.showAddForm);
router.post("/", formController.addFormItem);

module.exports = router;
