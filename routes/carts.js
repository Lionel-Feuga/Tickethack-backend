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

router.get("/", (req, res) => {
  Cart.find()
    .populate("tripId")
    .then((data) => {
      const transformedData = data.map((cart) => {
        const trip = cart.tripId.toObject();
        const hour = new Date(trip.date).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return {
          ...cart.toObject(),
          tripId: {
            ...trip,
            hour,
          },
        };
      });
      if (data.length > 0) {
        res.json({
          result: true,
          data: transformedData,
        });
      } else res.json({ result: false, message: "Panier vide" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: false, error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const cartId = req.params.id;

  Cart.findByIdAndDelete(cartId)
    .then(() => {
      console.log("Trajet supprimé du panier");
      res.json({ result: true, message: "Trajet supprimé du panier" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: false, error: err.message });
    });
});

module.exports = router;
