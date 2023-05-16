import { BadRequest, Forbidden, NotFound } from 'http-errors';
import _ from 'lodash';
import { Op } from 'sequelize';

import { Task } from '../models';
import { taskStatuses } from '../constants';

async function getTasks({ search, types }) {
  const where = _.pickBy({
    name: search ? { [Op.iLike]: `%${search}%` } : null,
    type: types?.length ? { [Op.in]: types.split(', ') } : null,
  });
  const tasks = await Task.scope('data').findAll({ where });
  if (!tasks) throw new NotFound('no_tasks_in_base');
  return tasks;
}

async function createTask({
  body: {
    customerId, name, cost, description, type,
  },
  file: { filename },
}) {
  const taskToCheck = await Task.findOne({ where: { name, customerId } });
  if (taskToCheck) throw new BadRequest(`Task with name ${name} already exist`);
  const img = `/static/img/${filename}`;
  return await Task.create({
    customerId,
    name,
    cost,
    description,
    status: taskStatuses.created,
    type,
    img,
  });
}

async function getTaskById({ id }) {
  const task = await Task.scope('data').findByPk(id);
  if (!task) throw new NotFound('no_task_in_base');
  return task;
}

async function updateTask(
  {
    params: { id },
    body: {
      cost, description, status, type,
    },
  },
) {
  const task = await Task.scope('data').findByPk(id);
  if (!task) throw new NotFound('no_task_in_base');

  await task.update({
    cost,
    description,
    status,
    type,
  });

  return task;
}

async function deleteTask({ params, user }) {
  const taskToDelete = await Task.scope('data').findByPk(params.id);
  if (!taskToDelete) throw new NotFound('no_task_in_base');

  if (taskToDelete.customer.user.id !== user.id) throw new Forbidden('You can delete only your tasks');

  await taskToDelete.destroy();
}

export {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
