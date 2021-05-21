const routesCard = require('express').Router();
const { createCard, getAllCards, deleteCard } = require('../controllers/cards');

routesCard.get('/cards', getAllCards);
routesCard.delete('/cards/:cardId', deleteCard);
routesCard.post('/cards', createCard);

module.exports = routesCard;