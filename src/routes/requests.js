import { Router } from 'express';

import { wrap } from '../utils';
import { RequestsController } from '../controllers';
import { roles } from '../constants';
import { authenticateToken, validateRequest } from '../middlewares';
import { updateRequest, createRequest } from '../requests';

const requestsRouter = Router();

requestsRouter
  .get(
    '/',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const tasks = await RequestsController.getRequests();
      res.json(tasks);
    }),
  )
  .post(
    '/',
    authenticateToken([roles.user, roles.admin]),
    validateRequest(createRequest),
    wrap(async (req, res) => {
      const task = await RequestsController.createRequest(req.body);
      res.json(task);
    }),
  )
  .get(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const task = await RequestsController.getRequestById(req.params);
      res.json(task);
    }),
  )
  .patch(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    validateRequest(updateRequest),
    wrap(async (req, res) => {
      const tasks = await RequestsController.updateRequest(req);
      res.json(tasks);
    }),
  )
  .delete(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      await RequestsController.deleteRequest(req);
      res.status(200).end();
    }),
  );

export { requestsRouter };
