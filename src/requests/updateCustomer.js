import * as yup from 'yup';

export const updateCustomer = yup.object().required().shape({
  employment: yup.string().required(),
});
