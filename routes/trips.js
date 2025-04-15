const express = require("express");
const router = express.Router();
const Trip = require("../models/trips.js");

router.get("/all", (req, res) => {
  Trip.find()
    .then((trips) => {
      res.json({ result: true, trips: trips });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/", (req, res) => {
  let { departure, arrival, date } = req.body;
  departure = departure.charAt(0).toUpperCase() + departure.slice(1).toLowerCase();
  arrival = arrival.charAt(0).toUpperCase() + arrival.slice(1).toLowerCase();
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  Trip.find({
    departure,
    arrival,
    date: { $gte: startOfDay, $lt: endOfDay },
  }).then((trips) => {
    trips
      ? res.json({ result: true, trips: trips })
      : res.json({ result: false, message: "No trips found" });
  });
});

module.exports = router;
