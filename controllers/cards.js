const Card = require('../models/cards');

const createCard = (req, res) => {
  const ownerID = req.user._id;
  const {name, link} = req.body;
  return Card.create({name, link, owner: ownerID})
    .then((card) => {
      return res.status(201).send({data: card})
    })
    .catch(err => {
        if (err.name === 'ValidationError') {
          return res.status(400).send({message: 'Переданы некорректные данные при создании карточки'})
        }
        return res.status(500).send({message: err.name})
      }
    );
};

const getAllCards = (req, res) => {
  return Card.find({})
    .then((cards) => {
      return res.status(200).send({data: cards})
    })
    .catch(err => {
        return res.status(500).send({message: err.message})
      }
    );
};

const deleteCard = (req, res) => {
  const {cardId} = req.params;
  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) {
        return res.status(201).send({data: card})
      }
      return res.status(404).send({message: 'Карточка с указанным _id не найдена'})
    })
    .catch(err => {
        console.log(err.name)
        return res.status(500).send({message: err.message})
      }
    );
};

const likeCard = (req, res) => {
  const ownerID = req.user._id;
  const {cardId} = req.params;
  return Card.findByIdAndUpdate(
    cardId, {$addToSet: {likes: ownerID}},
    {new: true},
  )
    .then((card) => {
      if (card) {
        return res.status(201).send({data: card})
      }
      return res.status(404).send({message: 'Карточка с указанным _id не найдена'})
    })
    .catch(err => {
        if (err.name === 'CastError') {
          return res.status(400).send({message: 'Переданы некорректные данные для постановки/снятии лайка'})
        }
        return res.status(500).send({message: err.message})
      }
    );
}

const dislikeCard = (req, res) => {
  const ownerID = req.user._id;
  const {cardId} = req.params;
  return Card.findByIdAndUpdate(
    cardId, {$pull: {likes: ownerID}},
    {new: true},
  )
    .then((card) => {
      if (card) {
        return res.status(201).send({data: card})
      }
      return res.status(404).send({message: 'Карточка с указанным _id не найдена'})
    })
    .catch(err => {
        if (err.name === 'CastError') {
          return res.status(400).send({message: 'Переданы некорректные данные для постановки/снятии лайка'})
        }
        return res.status(500).send({message: err.message})
      }
    );
}

module.exports = {
  createCard, getAllCards, deleteCard, likeCard, dislikeCard
}
