const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const areaRoutes = require("./routes/area");
const loginRoutes = require("./routes/login");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(areaRoutes);
app.use(loginRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
  console.log("Server Started!");
});
