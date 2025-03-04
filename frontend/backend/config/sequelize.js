import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('exam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  await sequelize.authenticate();
  console.log('Connected to database');
} catch (error) {
  console.error('Unable to connect', error);
}

export default sequelize;
