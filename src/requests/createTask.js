import * as yup from 'yup';

export const createTask = yup.object().required().shape({
  customerId: yup.string().uuid().required(),
  cost: yup.string().required(),
  description: yup.string().required(),
});
