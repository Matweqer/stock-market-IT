import { BadRequest } from 'http-errors';

import { UsersController } from './index';
import { User } from '../models';
import { comparePasswords, generateAccessToken, hashPassword } from '../utils';

async function login({ email, password }) {
  const user = await User.findOneOrFail({ email });

  if (!await comparePasswords(password, user.password)) {
    throw new BadRequest('invalid_login_or_password');
  }

  return {
    access: generateAccessToken(user.id, user.role),
  };
}

async function register({
  email, password, name, secondName, phone,
}) {
  let user = await User.findOne({ where: { email } });
  if (user) throw new BadRequest('User already exist');
  user = await UsersController.createUser({
    name, secondName, phone, email, password,
  });
  return user;
}

async function changePassword(user, { currentPassword, password }) {
  const isPasswordCorrect = await comparePasswords(currentPassword, user.password);
  if (!isPasswordCorrect) {
    throw new BadRequest('invalid_password');
  }
  user.password = await hashPassword(password);
  return user.save();
}

export {
  login,
  register,
  changePassword,
};
