const { DataTypes } = require('sequelize');

const User = (sequelize) => {
  const attributes = {
    email: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.STRING(10), allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    defaultScope: {
      // exclude pin hash by default
      attributes: { exclude: ['passwordHash'] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define('User', attributes, options);
};

module.exports = User;
