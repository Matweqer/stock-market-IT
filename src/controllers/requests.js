import { Forbidden, NotFound } from 'http-errors';
import { Op } from 'sequelize';

import { Request, Task } from '../models';
import { requestStatuses, taskStatuses } from '../constants';

async function getRequests() {
  const requests = await Request.scope('data').findAll();
  if (!requests) throw new NotFound('no_requests_in_base');
  return requests;
}

async function createRequest({ executorId, taskId }) {
  return await Request.create({
    executorId,
    taskId,
    status: requestStatuses.created,
  });
}

async function getRequestById({ id }) {
  const request = await Request.scope('data').findByPk(id);
  if (!request) throw new NotFound('no_request_in_base');
  return request;
}

async function updateRequest(
  {
    params: { id },
    body: { taskId, status },
  },
) {
  const request = await Request.scope('data').findByPk(id);
  if (!request) throw new NotFound('no_request_in_base');

  if (status === requestStatuses.accepted) {
    await Promise.all([
      Request.update(
        { status: requestStatuses.rejected },
        {
          where: {
            taskId,
          },
        },
      ),
      Task.update(
        { status: taskStatuses.found },
        {
          where: {
            id: taskId,
          },
        },
      ),
    ]);
  }
  await request.update({ status });
  return request;
}

async function deleteRequest({ params, user }) {
  const requestToDelete = await Request.scope('data').findByPk(params.id);
  if (!requestToDelete) throw new NotFound('no_request_in_base');

  if (requestToDelete.executor.user.id !== user.id) throw new Forbidden('You can delete only your requests');

  await requestToDelete.destroy();
}

export {
  getRequests,
  createRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
};
