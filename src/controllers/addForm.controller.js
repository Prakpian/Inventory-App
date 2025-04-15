const db = require("../db/queries");

function showAddForm(req, res) {
  res.render("../views/pages/addForm", { title: "Add New Item" });
}

async function addFormItem(req, res) {
  try {
    const { name, category, stock } = req.body;
    const addItemData = await db.addItem({ name, stock }, category);
    if (!addItemData) {
      throw new Error("Failed to add item");
    }
    res.redirect(`/${category}`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  showAddForm,
  addFormItem,
};
