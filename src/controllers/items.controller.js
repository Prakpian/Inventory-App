const db = require("../db/queries");

async function getItems(req, res) {
  try {
    const category = req.params.category;
    const items = await db.getAllitems(category);

    if (!items) {
      console.log("item not found");
      return res.status(404).send("item not found");
    }

    res.render("../views/pages/items", {
      title: `${category} List`,
      items,
      category,
    });
  } catch (err) {
    console.log(err);
  }
}

async function deleteAItem(req, res) {
  try {
    const { id, category } = req.params;
    const deletedItem = await db.deleteItem(id, category);

    if (!deletedItem) {
      console.log("item not found");
      return res.status(404).send("item not found");
    }

    res.redirect(`/${category}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/${category}`);
  }
}

async function showEditForm(req, res) {
  try {
    const { id, category } = req.params;
    const item = await db.getItemById(id, category);

    if (!item) {
      console.log("item not found");
      return res.status(404).send("item not found");
    }

    res.render("../views/pages/editItem", {
      title: "Edit",
      item,
      category,
    });
  } catch (err) {
    console.log(err);
  }
}
async function editItem(req, res) {
  try {
    const { id, category } = req.params;
    const { name, stock } = req.body;
    await db.updateItem({ name, stock, id }, category);
    res.redirect(`/${category}`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getItems,
  showEditForm,
  editItem,
  deleteAItem,
};
