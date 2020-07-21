const express = require("express");
const router = express.Router();
const LogEntry = require("../Model/logEntry");

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();

    res.json({
      message: entries,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const logEntry = new LogEntry(req.body);
    const savedEntry = await logEntry.save();
    res.status(200).json(savedEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
