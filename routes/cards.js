const routesCard = require('express').Router();
const auth = require('../middlewares/auth');

const {
  createCard, getAllCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routesCard.get('/cards', getAllCards);
routesCard.post('/cards', createCard);
routesCard.delete('/cards/:cardId', deleteCard);
routesCard.put('/cards/:cardId/likes', likeCard);
routesCard.delete('/cards/:cardId/likes', dislikeCard);

module.exports = routesCard;
