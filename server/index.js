require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./middleware");
const route = require("./Api/logRoute");
const app = express();

// MongoDB connection
mongoose.connect(
  "mongodb://localhost:27017/travelLogSchema",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("DB connected");
    } else {
      throw err;
    }
  }
);

// MiddleWares
app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_URL,
  })
);

// Routes
app.use("/api/logs", route);
app.get("/", (req, res) => {
  res.send("hello");
});


app.use(middleware.notFound);
app.use(middleware.ErrorMiddleWare);

const port = process.env.PORT || 1212;
app.listen(port, () =>
  console.log(`Server up and running at http://localhost:${port}`)
);
