import React, { useState, useContext, createContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import * as Yup from "yup";
import "./App.css";
import logo from "./images/logo.png";
import { login, signUp } from "./api";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

function Label(props) {
  return <label style={{ display: "block" }} {...props} />;
}

const Input = styled.input`
  width: 284px;
  background-color: inherit;
  border: none;
  border-bottom: 1px solid white;
  margin-bottom: 8px;
  padding-bottom: 4px;
  color: #fff;
  font-size: 12px;
  line-height: 16px;
`;

function FullField({ name, label, type }) {
  return (
    <div>
      <Label name="fvfgvtbtbh">{label}</Label>
      <Field name={name} as={Input} type={type} />
      <div>
        <ErrorMessage component="div" className="error--login" name={name} />
      </div>
    </div>
  );
}

const Container = styled.div`
  margin-top: 120px;
  color: #fff;
`;

const IntroMsg = styled.h2`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 48px;
`;

const SubmitButton = styled.button`
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 100px;
  width: 174px;
  height: 34px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #1a202c;
  margin-top: 32px;
  margin-bottom: 24px;
  border: none;
`;

function LoginForm() {
  const [user, setUser] = useContext(userContext);
  const [loginState, setLoginState] = useState(true);

  async function loginUser(values) {
    try {
      const newUser = await login(values);
      setUser(newUser);
      console.log(user);
      setLoginState(true);
    } catch (e) {
      console.log("invalid cdcdcdcdc");
      setLoginState(!loginState);
      console.log(loginState);
    }
  }

  return (
    <Container>
      <img src={logo} alt="logo" />
      <IntroMsg>
        Hi! Welcome to Walletable{" "}
        <span role="img" aria-label="wave">
          👋
        </span>
        <br /> Signin to start enyoing your new money management super powers!
      </IntroMsg>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Email is not valid")
            .required("Email is a required field"),
          password: Yup.string()
            .min(6, "Password is not valid: 6-40 digits")
            .max(40, "Password is not valid: 6-40 digits")
            .required("Password is a required field")
        })}
        onSubmit={values => {
          loginUser(values);
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {!loginState ? (
            <p className="error--login">Provided credentials are invalid</p>
          ) : null}
          <FullField name="email" label="Email Adress" />
          <FullField name="password" label="Password" type="password" />
          <SubmitButton type="submit">Submit</SubmitButton>
          <p style={{ fontWeight: "bold" }}>
            Don’t have an account?{" "}
            <Link to="/sign-up" style={{ color: "#A3BFFA" }}>
              Signup
            </Link>
          </p>
        </Form>
      </Formik>
    </Container>
  );
}

function SignUpForm() {
  const [user, setUser] = useContext(userContext);

  async function createAccount(values) {
    const newUser = await signUp(values);
    setUser(newUser);
    console.log(user);
    console.log("Se pudo loguear");
  }

  return (
    <Container>
      <img src={logo} alt="logo" />
      <IntroMsg>
        Hi! Welcome to Walletable{" "}
        <span role="img" aria-label="wave">
          👋
        </span>
        <br /> Signin to start enyoing your new money management super powers!
      </IntroMsg>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Email is not valid")
            .required("Email is a required field"),
          password: Yup.string()
            .min(6, "Password is not valid: 6-40 digits")
            .max(40, "Password is not valid: 6-40 digits")
            .required("Password is a required field")
        })}
        onSubmit={values => {
          createAccount(values);
          console.log(values);
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <FullField name="first_name" label="First Name" />
          <FullField name="last_name" label="Last Name" />
          <FullField name="phone" label="Phone Number" />
          <FullField name="email" label="Email Adress" />
          <FullField name="password" label="Password" type="password" />
          <FullField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <SubmitButton type="submit">Submit</SubmitButton>
          <p style={{ fontWeight: "bold" }}>
            Don’t have an account?{" "}
            <Link to="/sing-up" style={{ color: "#A3BFFA" }}>
              Signup
            </Link>
          </p>
        </Form>
      </Formik>
    </Container>
  );
}

const userContext = React.createContext(); 

function App() {
  const [user, setUser] = useState();
  

  return (
    <Router>
      <userContext.Provider value={[user, setUser]} >
      <Route path="/" exact component={LoginForm} />
      <Route path="/sign-up" component={SignUpForm} />
      </userContext.Provider>
    </Router>
  );
}

export default App;
