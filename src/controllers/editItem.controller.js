const db = require("../db/queries");

async function showEditForm(req, res) {
  try {
    const item = await db.getItemById(req.params.category, req.params.id);
    res.render("../views/pages/editItem", {
      title: `Edit ${item.name}`,
      item,
      category: req.params.category,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  showEditForm,
};
