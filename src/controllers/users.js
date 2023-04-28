import { Forbidden, NotFound } from 'http-errors';
import { User } from '../models';
import { hashPassword } from '../utils';

async function getUsers() {
  const users = await User.scope('data').findAll();
  if (!users) throw new NotFound('no_users_in_base');
  return users;
}

async function createUser({
  name, secondName, phone, email, password,
}) {
  const hashedPassword = hashPassword(password);
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    secondName,
    phone,
  });
  user.password = undefined;
  return user;
}

async function getUserById({ id }) {
  const user = await User.scope('data').findByPk(id);
  if (!user) throw new NotFound('no_user_in_base');
  return user;
}

async function updateUser({
  params: { id },
  body: {
    name, secondName, phone, email,
  },
}) {
  const user = await User.scope('data').findByPk(id);
  if (!user) throw new NotFound('no_user_in_base');

  await user.update({
    name, secondName, phone, email,
  });

  return user;
}

async function deleteUser({ params, user }) {
  if (user.id !== params.id) throw new Forbidden('You can delete only yourself account');

  const userToDelete = await User.findByPk(params.id);
  if (!userToDelete) throw new NotFound('no_user_in_base');

  await userToDelete.destroy();
}

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
};
