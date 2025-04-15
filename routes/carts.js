const express = require("express");
const router = express.Router();
const Cart = require("../models/carts");

router.post("/", (req, res) => {
  const newCart = new Cart({
    tripId: req.body.tripId,
  });

  newCart
    .save()
    .then(() => {
      console.log("Trajet ajouté au panier");
      res.json({ result: true, message: "Trajet ajouté au panier" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: false, error: err.message });
    });
});

router.get("/:tripId", (req, res) => {
  const tripId = req.params.tripId
  Cart.findOne({ tripId })
    .populate("tripId")
    .then((data) => {
      res.json(data);
    });
});

module.exports = router