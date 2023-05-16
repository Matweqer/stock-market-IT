import * as yup from 'yup';

export const createTask = yup.object().required().shape({
  customerId: yup.string().uuid().required(),
  name: yup.string().required(),
  type: yup.string().required(),
  cost: yup.string().required(),
  description: yup.string().required(),
});
