require("dotenv").config();
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");

const phoneRoutes = require("./src/routes/phone.routes");
const formRoutes = require("./src/routes/addForm.routes");

app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("layout", "index");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/phones", phoneRoutes);
app.use("/add", formRoutes);

app.get("/", (req, res) => {
  res.render("pages/home", { title: "Home" });
  console.log();
});

app.listen(port, () => {
  console.log(`Listening to port ${3000}`);
});
