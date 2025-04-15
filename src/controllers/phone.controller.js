const db = require("../db/queries");

async function getPhoneItems(req, res) {
  try {
    const phones = await db.getAllitems("phones");
    if (phones) {
      res.render("../views/pages/phone", {
        title: "Phone list",
        phones: phones,
      });
    } else {
      console.log("No phones found");
      return res.status(404).json({ message: "No phones found" });
    }
  } catch (err) {
    console.log(err);
  }
}

async function deletePhoneItem(req, res) {
  try {
    const { id } = req.params;
    const deletedPhone = await db.deleteItem(id, "phones");

    if (!deletedPhone) {
      return res.status(404).render("error", {
        message: "Phone not found",
      });
    }

    res.redirect("/phones");
  } catch (err) {
    console.error("Delete error:", err);
    res.redirect("/phones");
  }
}

async function showEditForm(req, res) {
  try {
    const { id } = req.params;
    const item = await db.getItemById(id, "phones");
    res.render("../views/pages/editItem", {
      title: "Edit",
      item,
      category: "phones",
    });
  } catch (err) {
    console.log(err);
  }
}

async function editItem(req, res) {
  try {
    const { name, stock } = req.body;
    const { id } = req.params;
    const addItemData = await db.updateItem({ name, stock, id }, "phones");
    if (!addItemData) {
      throw new Error("Failed to edit item");
    }
    res.redirect("/phones");
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getPhoneItems,
  deletePhoneItem,
  showEditForm,
  editItem,
};
