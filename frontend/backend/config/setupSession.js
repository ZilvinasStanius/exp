import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import mysql from 'mysql2/promise';

const MysqlStoreInstanse = MySQLStore(session);

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'exam',
};

const pool = mysql.createPool(dbConfig);

const sessionStore = new MysqlStoreInstanse({}, pool);

export function configDbSession(app) {
  app.use(
    session({
      secret: 'banana',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
}

sessionStore
  .onReady()
  .then(() => {
    console.log('MySQLStore ready');
  })
  .catch((error) => {
    console.error(error);
  });
