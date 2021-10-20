const router = require('express').Router();
const {
  createUser, getUsers, getUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUserInfo);

module.exports = router;
