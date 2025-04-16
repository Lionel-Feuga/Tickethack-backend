const Trip = require('../models/trips')
var express = require('express');
var router = express.Router();


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


 