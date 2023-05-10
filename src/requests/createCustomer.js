import * as yup from 'yup';

export const createCustomer = yup.object().required().shape({
  userId: yup.string().uuid().required(),
  employment: yup.string().required(),
});
