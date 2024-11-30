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
    origin: [
      "http://localhost:5173",
      "https://flavoro-mern.netlify.app",
      "http://localhost:5000",
    ],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:5173",
    "https://flavoro-mern.netlify.app",
    "http://localhost:5000"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(cookieParser());

// Define a route for the root endpoint
app.get("/", (req, res) => {
  res.send("Server is running on the front page!");
});

app.use("/api", routes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
