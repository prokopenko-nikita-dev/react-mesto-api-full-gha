const Card = require('../models/card');

// GET /cards
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// POST /cards
const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// DELETE /cards/:cardId
const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => {
      const error = new Error('Нет карточки по заданному id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => Card.deleteOne(card)
      .then(() => res.send({ data: card })))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный идентификатор карточки' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateLike = (req, res, method) => {
  const { params: { id } } = req;
  // const method === req.method === 'PUT' ? '$addToSet' : '$pull'
  Card.findByIdAndUpdate(id, { [method]: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('Нет карточки по заданному id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный идентификатор' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// PUT /cards/:cardId/likes
const likeCard = (req, res) => updateLike(req, res, '$addToSet');

// DELETE /cards/:cardId/likes
const dislikeCard = (req, res) => updateLike(req, res, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
