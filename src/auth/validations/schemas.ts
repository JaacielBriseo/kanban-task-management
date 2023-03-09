import * as Yup from 'yup'

export const registerSchema = Yup.object({
  name: Yup.string().min(5, 'Enter a valid full name').required('Full name is required.'),
  email: Yup.string().email('Please enter a valid email.').required('Email is required.'),
  password: Yup.string().min(6, 'Password must be at least of 6 characters.').required('Password is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
    .required('Confirm the password.'),
});

export const loginSchema = Yup.object({
  email: Yup.string().required('Email is required.').email('Invalid email.'),
  password: Yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters.'),
});