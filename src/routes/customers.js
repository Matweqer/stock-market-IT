import { Router } from 'express';

import { wrap } from '../utils';
import { CustomersController } from '../controllers';
import { roles } from '../constants';
import { authenticateToken, validateRequest } from '../middlewares';
import { updateCustomer } from '../requests';

const customersRouter = Router();

customersRouter
  .get(
    '/',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const customers = await CustomersController.getCustomers();
      res.json(customers);
    }),
  )
  .get(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const customer = await CustomersController.getCustomerById(req.params);
      res.json(customer);
    }),
  )
  .patch(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    validateRequest(updateCustomer),
    wrap(async (req, res) => {
      const customer = await CustomersController.updateCustomer(req);
      res.json(customer);
    }),
  )
  .delete(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      await CustomersController.deleteCustomer(req);
      res.status(200).end();
    }),
  );

export { customersRouter };
