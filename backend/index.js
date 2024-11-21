const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectDb } = require("./connection/connection");
const routes = require("./routes");

connectDb();
app.use(
  cors({
    origin: ["http://localhost:5173","https://flavoro-mern.netlify.app"],
    credentials: true,
  })
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173','https://flavoro-mern.netlify.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
