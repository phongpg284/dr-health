import "./login.scss";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch } from "../../app/store";
import { updateToken } from "../../app/authSlice";
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { LOGIN } from "./schema";

import * as GreetingBotStore from '../../app/GreetingBot'
import Abstract13 from 'assets/abstract13.svg'

interface ILoginInputForm {
  email: string;
  password: string;
  role: boolean;
}

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email required!"),
  password: yup.string().required("Password required!"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [showError, setShowError] = useState<string>("");
  const [login] = useLazyQuery(LOGIN, {
    onCompleted(data) {
      if (data && data.login.message === "Matched user") {
        dispatch(
          updateToken({
            accessToken: data.login.accessToken,
            email: data.login.email,
            role: data.login.role,
            id: data.login.id,
          })
        );
        history.push("/");
      } else setShowError(data.login.message);
    },
  });

  const handleSubmit = (data: ILoginInputForm) => {
    setLoginEmail(data.email);
    login({
      variables: {
        inputs: {
          ...data,
          role: data.role ? "doctor" : "patient",
        },
      },
    });
  };

  React.useEffect(() => {
    dispatch(GreetingBotStore.setGreetingName(GreetingBotStore.GreetingNameType.LoginPage))
  }, [])

  return (
    <div className="login-form">
      <img src={Abstract13} className="backgroundLogin" alt="background" />
      <div className="login-content">
        <h1 className="login-form-title">Đăng nhập</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            role: false,
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="login-form-input"
                controlId="formBasicEmail"
              >
                <Form.Label className="login-form-label">
                  Email
                </Form.Label>

                <Form.Control
                  type="email"
                  name="email"
                  // placeholder="Email"
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid" className="input-error">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="login-form-input"
                controlId="formBasicPassword"
              >
                <Form.Label className="login-form-label">
                  Mật khẩu
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="password"
                    type="password"
                    // placeholder="Password"
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  {/* <InputGroup.Text onClick={handleVisiblePassword}>
                    {isPasswordShow && <EyeOutlined />}
                    {!isPasswordShow && <EyeInvisibleOutlined />}
                  </InputGroup.Text> */}
                  <Form.Control.Feedback type="invalid" className="input-error">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="login-form-role-check">
                <div className="role_checker">Bác sĩ?</div>
                <Form.Check
                  size={20}
                  name="role"
                  onChange={handleChange}
                  id="validationFormik0"
                />
              </Form.Group>
              <div className="errors">
                {showError && <div>{showError}</div>}
              </div>

              <Button className="submitBtn" type="submit">
                Đăng nhập
              </Button>
              <Link className="create-account-link" to="./signup">Tạo tài khoản</Link>

              <Link className="backToHome" to="/">Về trang chủ</Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
