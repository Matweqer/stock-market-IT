import * as yup from 'yup';
import { taskStatuses } from '../constants';

export const updateTask = yup.object().required().shape({
  status: yup.number().oneOf(Object.values(taskStatuses)),
  cost: yup.number().integer().positive(),
  description: yup.string(),
  type: yup.string(),
});
