import * as yup from 'yup';

export default yup.object().shape({
    name: yup
    .string()
    .required('Name is required'),
    email: yup
    .string()
    .email('Must be a valid email')
    .required('Must enter an email'),
    password: yup
    .string()
    .required('Password is required'),
    terms: yup.boolean(),
})
