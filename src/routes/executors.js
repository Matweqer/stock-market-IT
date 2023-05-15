import { Router } from 'express';

import { wrap } from '../utils';
import { ExecutorsController } from '../controllers';
import { roles } from '../constants';
import { authenticateToken, cvUploader, validateRequest } from '../middlewares';
import { updateExecutor, createExecutor } from '../requests';

const executorsRouter = Router();

executorsRouter
  .get(
    '/',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const executors = await ExecutorsController.getExecutors();
      res.json(executors);
    }),
  )
  .post(
    '/',
    validateRequest(createExecutor),
    wrap(async (req, res) => {
      const executor = await ExecutorsController.createExecutor(req.body);
      res.json(executor);
    }),
  )
  .get(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const executor = await ExecutorsController.getExecutorById(req.params);
      res.json(executor);
    }),
  )
  .patch(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    validateRequest(updateExecutor),
    wrap(async (req, res) => {
      const executor = await ExecutorsController.updateExecutor(req);
      res.json(executor);
    }),
  )
  .put(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    cvUploader,
    wrap(async (req, res) => {
      const executor = await ExecutorsController.putCv(req);
      res.json(executor);
    }),
  )
  .delete(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      await ExecutorsController.deleteExecutor(req);
      res.status(200).end();
    }),
  );

export { executorsRouter };
