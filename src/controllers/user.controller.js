const express = require('express');
const router = express.Router();
const httpStatus = require('http-status');
const { userService } = require('../services');

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
};

const getUsers = async (req, res) => {
  const result = await userService.getAllUser();
  res.send(result);
};

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
};

const deleteUser = async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
};

// routes

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
