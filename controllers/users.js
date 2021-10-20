const User = require('../models/user');

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// POST /users
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400)
          .send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// GET /users/:userId
const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const error = new Error('Пользователь по заданному id отсутствует в базе');
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateUserData = (res, req) => {
  const { user: { _id }, body } = req;
  User.findByIdAndUpdate(_id, body, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('Пользователь по заданному id отсутствует в базе');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный id пользователя' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const updatedFields = ['name', 'about'];

// PATCH /users/me
const updateUserInfo = (req, res) => {
  const { body } = req;
  const emptyField = updatedFields.find((field) => body[field] === undefined);
  if (emptyField) {
    return res.status(400).send({ message: `Поле "${emptyField}" должно быть заполнено` });
  }
  return updateUserData(res, req);
};

// PATCH /users/me/avatar
const updateUserAvatar = (req, res) => {
  const { body } = req;
  if (!body.avatar) {
    return res.status(400).send({ message: 'Поле "avatar" должно быть заполнено' });
  }
  return updateUserData(res, req);
};

module.exports = {
  updateUserInfo,
  updateUserAvatar,
  createUser,
  getUsers,
  getUser,
};
