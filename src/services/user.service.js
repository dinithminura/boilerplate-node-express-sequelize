const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

const getAllUser = async () => {
  return await db.User.findAll();
};

const getUserById = async (id) => {
  let user = await getUser(id);
  return user;
};

const createUser = async (params) => {
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw 'Email "' + params.email + '" is already registered';
  }
  const user = new db.User(params);
  user.passwordHash = await bcrypt.hash(params.password, 10);
  await user.save();
};

const updateUser = async (id, params) => {
  const user = await getUser(id);
  const emailChanged = params.email && user.email !== params.email;
  if (
    emailChanged &&
    (await db.User.findOne({ where: { email: params.email } }))
  ) {
    throw 'Email "' + params.email + '" is already registered';
  }

  if (params.password) {
    params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  Object.assign(user, params);
  await user.save();
};

const deleteUser = async (id) => {
  const user = await getUser(id);
  await user.destroy();
};

const getUser = async (id) => {
  const user = await db.User.findByPk(id);
  if (!user) throw 'User not found';
  return user;
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
