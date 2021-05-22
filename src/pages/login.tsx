import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { IconButton, InputAdornment, Paper } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useSnackbar } from 'notistack'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../contexts/auth'
import { Text, TextField, Button } from '../styleguide'
import { LoginPayload } from '../types/payloads'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be an email')
    .required('This field is required'),
  password: Yup.string()
    .min(6, 'At least 6 characters')
    .max(20, 'Max 20 characters')
    .required('This field is required'),
})

export const Login: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const { isAuthenticated, login } = useAuth()

  const handleSubmit = async (values: LoginPayload): Promise<void> => {
    setIsSubmitting(true)

    try {
      await login(values)
      enqueueSnackbar('Signed in', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || 'Unable to sign in', {
        variant: 'error',
      })
      setIsSubmitting(false)
    }
  }

  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <section className="min-h-screen flex">
      <div className="w-1/2 p-8 flex flex-col justify-center items-center">
        <Paper className="p-8">
          <Text variant="h1" className="mb-2">
            Sign in to your account
          </Text>
          <Text className="mb-12">Stay in touch with your colleagues</Text>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-8">
              <TextField name="email" label="Email" />
              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  loading={isSubmitting}
                >
                  Sign in
                </Button>
                <Text variant="body2" className="mt-2">
                  Do not have an account?{' '}
                  <Link to="/register" className="underline">
                    Sign up
                  </Link>
                </Text>
              </div>
            </Form>
          </Formik>
        </Paper>
      </div>
      <div
        className="w-1/2 bg-cover bg-left"
        style={{ backgroundImage: 'url(/images/banner.jpg)' }}
      />
    </section>
  )
}
