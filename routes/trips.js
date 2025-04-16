const Trip = require('../models/trips')
var express = require('express');
var router = express.Router();
var moment = require('moment'); // require
moment().format(); 


router.get('/', (req, res) => {
 const date = req.body.date

Trip.find({departure: req.body.departure , arrival: req.body.arrival ,
   date:{ $gte:moment().startOf(date).toDate(), $lt:moment().endOf(date).toDate() }})
.then(data => {
  res.json({result: true, data})
})
})














 module.exports = router;


 