require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());

const characterRoutes = require("./routes/character");
app.use("/characters", characterRoutes);

const comicRoutes = require("./routes/comic");
app.use("/comics", comicRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "all routes" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started ! 🚀🚀");
});
