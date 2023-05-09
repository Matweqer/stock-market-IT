import { Router } from 'express';

import { wrap } from '../utils';
// import { UsersController } from '../controllers';
import { roles } from '../constants';
import { authenticateToken, validateRequest } from '../middlewares';
// import { updateUser } from '../requests';

const customersRouter = Router();

customersRouter
  .get(
    '/',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      // const users = await UsersController.getUsers();
      res.json();
    }),
  )
  .get(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      // const users = await UsersController.getUserById(req.params);
      res.json();
    }),
  )
  .patch(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    // validateRequest(updateUser),
    wrap(async (req, res) => {
      // const user = await UsersController.updateUser(req);
      res.json();
    }),
  )
  .delete(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      // await UsersController.deleteUser(req);
      res.status(200).end();
    }),
  );

export { customersRouter };
