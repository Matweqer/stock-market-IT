import * as yup from 'yup';

export const registration = yup.object().required().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
  secondName: yup.string().required(),
  phone: yup.string().required(),
});
