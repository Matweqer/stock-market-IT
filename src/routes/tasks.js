import { Router } from 'express';

import { wrap } from '../utils';
import { TasksController } from '../controllers';
import { roles } from '../constants';
import { authenticateToken, validateRequest } from '../middlewares';
import { updateTask, createTask } from '../requests';

const tasksRouter = Router();

tasksRouter
  .get(
    '/',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const tasks = await TasksController.getTasks();
      res.json(tasks);
    }),
  )
  .post(
    '/',
    authenticateToken([roles.user, roles.admin]),
    validateRequest(createTask),
    wrap(async (req, res) => {
      const task = await TasksController.createTask(req.body);
      res.json(task);
    }),
  )
  .get(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      const task = await TasksController.getTaskById(req.params);
      res.json(task);
    }),
  )
  .patch(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    validateRequest(updateTask),
    wrap(async (req, res) => {
      const tasks = await TasksController.updateTask(req);
      res.json(tasks);
    }),
  )
  .delete(
    '/:id',
    authenticateToken([roles.user, roles.admin]),
    wrap(async (req, res) => {
      await TasksController.deleteTask(req);
      res.status(200).end();
    }),
  );

export { tasksRouter };