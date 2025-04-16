const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");


router.get('/', (req, res) => {
Booking.find().then(data => {
    res.json({data});
})

})



router.post('/', (req, res) => {
    const date = new Date(req.body.date)
    const newBooking = new Booking({
        departure: req.body.departure,
        arrival: req.body.arrival,
        date: date,
        price: req.body.price,
    })
newBooking.save().then(
    ()=>{
        res.json("nouveau booking créé")
    }
)
})


module.exports = router