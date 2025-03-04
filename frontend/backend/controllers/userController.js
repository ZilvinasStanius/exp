import {
  generateSalt,
  hashPassword,
  isValidCredentials,
} from '../utils/encription.js';

import User from '../models/UserModel.js';
import { registrationSchema } from '../utils/UserSchema.js';

///Register user

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (req.session.user && req.session.user.isLogged) {
    return res
      .status(403)
      .json('You are already logged in. Log out to create new User');
  }
  try {
    const validationResults = registrationSchema.safeParse(req.body);
    if (!validationResults.success) {
      return res.status(400).json({ error: validationResults.error.issues });
    }

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const user = await User.create({
      username,
      email,
      salt,
      hashedPassword,
    });

    req.session.user = {
      username,
      email,
      id: user.id,
      isLogged: true,
    };
    res
      .status(201)
      .json({ message: 'Registration was successful', session: req.session });
  } catch (error) {
    if (err?.original && err.original.errno === 1062) {
      return res
        .status(400)
        .json({ message: 'username or email field was not unique' });
    }
    res
      .status(500)
      .json({ message: 'internal server error', err: err.message });
  }
}

//USER LOGOUT CONTROLLER
export async function logout(req, res) {
  if (!req.session.user)
    return res.status(403).json({ message: 'You are already logged out' });
  req.session.destroy(() => {
    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'You logged out successfully' });
  });
}

//Login

export async function login(req, res) {
  if (req.session.user) {
    return res.status(403).json({ message: 'You already logged in' });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser)
      return res.status(404).json({ message: 'User not found' });

    if (
      !isValidCredentials(
        password,
        existingUser.salt,
        existingUser.hashedPassword
      )
    )
      return res.status(400).json({ message: 'Invalid credentials' });

    req.session.user = {
      username: existingUser.username,
      email: existingUser.email,
      id: existingUser.id,
      isLogged: true,
    };
    return res
      .status(200)
      .json({ message: 'Logged in successfully', session: req.session });
  } catch (error) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//SESION

export async function getSessionData(req, res) {
  if (!req.session.user.isLogged) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  try {
    // Check if user id is in session
    if (!req.session.user?.id) {
      res.status(404).json({ message: 'User is not defined' });
    }

    // If we have a valid userId, try to get fresh data
    const freshUserData = await User.findOne({
      where: { id: req.session.user.id },
    });
    //with plain : true; We getting plain data object without unesesary wraps
    const userData = freshUserData
      ? freshUserData.get({ plain: true })
      : req.session.user;

    res.status(200).json({
      message: 'User session data retrieved',
      user: userData,
      session: req.session.user,
    });
  } catch (error) {
    console.log('Error in getSessionData:', error);
    res.status(500).json({ message: 'Enternal server error' });
  }
}
