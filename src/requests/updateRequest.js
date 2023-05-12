import * as yup from 'yup';
import { requestStatuses } from '../constants';

export const updateRequest = yup.object().required().shape({
  taskId: yup.string().uuid().required(),
  status: yup.number().oneOf(Object.values(requestStatuses)).required(),
});
