import * as yup from 'yup';

export const update = yup.object().required().shape({
  email: yup.string().email(),
  name: yup.string(),
  secondName: yup.string(),
  phone: yup.string(),
});
