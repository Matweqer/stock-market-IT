import * as yup from 'yup';

export const createExecutor = yup.object().required().shape({
  userId: yup.string().uuid().required(),
  experience: yup.string().required(),
  technologies: yup.string().required(),
});
