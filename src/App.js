import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import * as Yup from "yup";
import "./App.css";
import logo from "./images/logo.png";
import {login} from "./api";

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

function FullField({ name, label }) {
  return (
    <div>
      <Label name="fvfgvtbtbh">{label}</Label>
      <Field name={name} as={Input} />
      <div>
        <ErrorMessage name={name} />
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

function App() {
  //const [user, setUser] = useState();
  //const [loginState, setLoginState] = userState(true);

  async function loginUser(values) {
    try {
      const newUser = await login(values);
      //setUser(newUser);
      console.log(newUser);
    } catch (e) {
      prompt("invalid cdcdcdcdc");
      //setLoginState(!loginUser);
    }
  }
 
  return (
    <Container>
      <img src={logo} alt="logo" />
      <IntroMsg>
        Hi! Welcome to Walletable 👋
        <br /> Signin to start enyoing your new money management super powers!
      </IntroMsg>
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
            .required()
        })}
        onSubmit={(values) => {loginUser(values)}}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <FullField name="email" label="Email Adress" />
          <FullField name="password" label="Password" />
          <SubmitButton type="submit">Submit</SubmitButton>
          <p>
            Don’t have an account?{" "}
            <a href="#" style={{ color: "#A3BFFA" }}>
              Signup
            </a>
          </p>
        </Form>
      </Formik>
    </Container>
  );
}

export default App;
