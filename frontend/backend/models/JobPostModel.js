import sequelize from '../config/sequelize.js';
import { DataTypes, DECIMAL } from 'sequelize';

const JobPosts = sequelize.define('posts', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT('medium'),
    allowNull: false,
  },
  salary: { type: DECIMAL(10, 2), allowNull: false },
});

export default JobPosts;
