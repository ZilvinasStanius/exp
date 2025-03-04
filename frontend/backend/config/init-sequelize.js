import sequelize from './sequelize.js';
import User from '../models/UserModel.js';
import JobPosts from '../models/JobPostModel.js';

await sequelize.sync();
