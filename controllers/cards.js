const Card = require('../models/cards');

module.exports.createCard = (req, res) => {
  console.log("Create card")
  const ownerID = req.user._id;
  const {name, link} = req.body;
    Card.create({name, link, owner: ownerID})
      .then( (card) => {
        res.send({data: card})
        console.log(card)
      })
    .catch(err => res.status(500).send({message: err.message}));
};

module.exports.getAllCards = (req, res) => {
  console.log("Find all cards")
  Card.find({})
    .then( (cards) => {
      res.send({data: cards})
      console.log(cards)
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  console.log("Delete card")
  Card.findByIdAndRemove(req.params.cardId)
    .then( (cards) => {
      res.send({data: cards})
      console.log(cards)
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
