import * as yup from 'yup';

export const createRequest = yup.object().required().shape({
  executorId: yup.string().uuid().required(),
  taskId: yup.string().uuid().required(),
});
