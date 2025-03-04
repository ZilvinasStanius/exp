import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
