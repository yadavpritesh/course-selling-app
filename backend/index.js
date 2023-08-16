const express = require("express");
const app = express();
const cors = require("cors");
const { mongoose } = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");

const UserRoute = require("./routes/UserRoutes");
const AdminRoute = require("./routes/AdminRoutes");
dotenv.config();

app.use(express.json());
app.use(cors());

// const Database = process.env.DATABASE_URI;
const Database = 'mongodb://localhost:27017';

mongoose
  .connect(Database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("not connected", err));

app.use("/admin", AdminRoute);
app.use("/users", UserRoute);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server! `,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
