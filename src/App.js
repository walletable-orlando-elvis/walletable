import {React, userState} from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './App.css';
import {login} from "./api.js"

function Label(props) {
  return <label style={{ display: "block" }} {...props} />;
}
 
function FullField({ name, label }) {
  return (
    <div>
      <Label name="fvfgvtbtbh">{label}</Label>
      <Field name={name} />
      <div>
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = userState();

  async function loginUser(values) {
    try {
      const newUser = await login(values);
      setUser(newUser);
      console.log(user);
    } catch (e) {
      prompt("invalid cdcdcdcdc");
    }
  }
 
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .min(6, "Must have more than 6 digits")
          .required(),
      })}
      onSubmit={(values) => {loginUser(values)}}
    >
      <Form>
        <h2>Login</h2>
        <FullField name="email" label="Email" />
        <FullField name="password" label="Password" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default App;