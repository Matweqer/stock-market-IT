import * as yup from 'yup';

export const updateExecutor = yup.object().required().shape({
  experience: yup.string(),
  technologies: yup.string(),
});
