import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from './styleguide/button'
import { TextField } from './styleguide/text-field'

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(20).required(),
})

export const App: React.FC = () => {
  return (
    <div>
      <p className="text-green-500">Hello world</p>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => console.log(values)}
      >
        <Form className="flex flex-col space-y-6 w-96">
          <TextField name="email" label="Email" />
          <TextField type="password" name="password" label="Password" />
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  )
}
