import { Router } from 'express';

import { wrap } from '../utils';
import { UsersController } from '../controllers';
import { roles } from '../constants';
import { authenticateToken, validateRequest } from '../middlewares';
import { updateUser } from '../requests';

const usersRouter = Router();

usersRouter
  .get(
    '/',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const users = await UsersController.getUsers();
      res.json(users);
    }),
  )
  .get(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const users = await UsersController.getUserById(req.params);
      res.json(users);
    }),
  )
  .patch(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    validateRequest(updateUser),
    wrap(async (req, res) => {
      const user = await UsersController.updateUser(req);
      res.json(user);
    }),
  )
  .delete(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      await UsersController.deleteUser(req);
      res.status(200).end();
    }),
  );

export { usersRouter };
