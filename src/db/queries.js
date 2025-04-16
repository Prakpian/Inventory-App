const pool = require("./pool");

async function getAllitems(category) {
  const validCategories = ["phones", "tablets", "laptops"];
  if (!validCategories.includes(category)) {
    throw new Error("Invalid category request");
  }
  try {
    const { rows } = await pool.query(`SELECT * FROM ${category}`);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function deleteItem(id, category) {
  const validCategories = ["phones", "tablets", "laptops"];
  if (!validCategories.includes(category)) {
    throw new Error("Invalid category");
  }
  try {
    const item = await pool.query(
      `DELETE FROM ${category} WHERE id = $1 RETURNING *`,
      [id]
    );
    return item.rows[0];
  } catch (err) {
    console.log(err);
  }
}

async function addItem(itemData, category) {
  const validCategories = ["phones", "tablets", "laptops"];
  if (!validCategories.includes(category)) {
    throw new Error("Invalid category");
  }
  try {
    const query = {
      text: `
      INSERT INTO ${category} (itemName, stock)
      VALUES ($1, $2)
      RETURNING *
    `,
      values: [itemData.name, itemData.stock],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
  console.log(itemData);
}

async function getItemById(id, category) {
  const validCategories = ["phones", "tablets", "laptops"];

  if (!validCategories.includes(category)) {
    throw new Error("Invalid category");
  }

  const { rows } = await pool.query(`SELECT * FROM ${category} WHERE id = $1`, [
    id,
  ]);
  return rows[0];
}

async function updateItem(itemData, category) {
  const validCategories = ["phones", "tablets", "laptops"];
  if (!validCategories.includes(category)) {
    throw new Error("Invalid category");
  }
  try {
    const query = {
      text: `UPDATE ${category}
     SET itemName = $1, stock = $2
     WHERE ID = $3
     RETURNING *`,
      values: [itemData.name, itemData.stock, parseInt(itemData.id)],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllitems,
  deleteItem,
  addItem,
  getItemById,
  updateItem,
};
