import * as yup from 'yup';


const schema = yup.object().shape({
  name: yup.string().required(' name must be at least 2 characters'),
  size: yup.string().required(' special field is required'),
  toppings: yup.array().of(yup.string()),
  special: yup.string(),
});

// Exports
export default schema