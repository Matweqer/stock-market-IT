import * as yup from 'yup';

export const login = yup.object().required().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
