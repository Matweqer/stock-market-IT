import { Router } from 'express';

import { wrap } from '../utils';
import {
  roles, requestStatuses, taskStatuses, taskTypes,
} from '../constants';
import { authenticateToken } from '../middlewares';

const systemRouter = Router();

systemRouter
  .get(
    '/tasks/statuses',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      res.json(taskStatuses);
    }),
  )
  .get(
    '/tasks/types',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      res.json(taskTypes);
    }),
  )
  .get(
    '/requests/statuses',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      res.json(requestStatuses);
    }),
  );

export { systemRouter };
