import { Forbidden, NotFound } from 'http-errors';
import { Executor } from '../models';

async function getExecutors() {
  const executors = await Executor.scope('data').findAll();
  if (!executors) throw new NotFound('no_executors_in_base');
  return executors;
}

async function createExecutor({ experience, technologies, userId }) {
  return await Executor.create({
    userId,
    experience,
    technologies,
  });
}

async function getExecutorById({ id }) {
  const executor = await Executor.scope('data').findByPk(id);
  if (!executor) throw new NotFound('no_executors_in_base');
  return executor;
}

async function updateExecutor(
  {
    params: { id },
    body: { experience, technologies },
  },
) {
  const executor = await Executor.scope('data').findByPk(id);
  if (!executor) throw new NotFound('no_executor_in_base');

  await executor.update({
    experience,
    technologies,
  });

  return executor;
}

async function putCv({ params: { id }, file: { filename } }) {
  const executor = await Executor.scope('data').findByPk(id);
  if (!executor) throw new NotFound('no_executor_in_base');
  const cv = `/static/cv/${filename}`;

  await executor.update({
    cv,
  });

  return executor;
}

async function deleteExecutor({ params, user }) {
  const executorToDelete = await Executor.scope('data').findByPk(params.id);
  if (!executorToDelete) throw new NotFound('no_executor_in_base');

  if (executorToDelete.user.id !== user.id) throw new Forbidden('You can delete only yourself account');

  await executorToDelete.destroy();
}

export {
  getExecutors,
  createExecutor,
  getExecutorById,
  updateExecutor,
  putCv,
  deleteExecutor,
};
