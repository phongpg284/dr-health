import "./login.scss";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";

import { useAppDispatch } from "../../app/store";
import { updateToken } from "../../app/authSlice";
import * as GreetingBotStore from "../../app/GreetingBot";
import Abstract13 from "assets/abstract13.svg";
import { useApi } from "utils/api";
import { AxiosError } from "axios";

interface ILoginInputForm {
  email: string;
  password: string;
  role: boolean;
}

const LoginSchema = yup.object().shape({
  email: yup.string().email("Must be a valid email").required("Email required!"),
  password: yup.string().required("Password required!"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [showError, setShowError] = useState<string>("");
  const api = useApi();

  const handleLogin = (params: any) => {
    api
      .post("/auth/login", params)
      .then((res) => {
        const data = res.data;
        if (data && data.accessToken && data.refreshToken) {
          dispatch(
            updateToken({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              email: data.email,
              role: data.role,
              id: data.id,
            })
          );
          history.push("/");
        } 
      })
      .catch((error: AxiosError) => {
        setShowError((error.response?.data as any)?.message);
      });
  };

  const handleSubmit = (data: ILoginInputForm) => {
    handleLogin({
      ...data,
      role: data.role ? "doctor" : "patient",
    });
  };

  React.useEffect(() => {
    dispatch(GreetingBotStore.setGreetingName(GreetingBotStore.GreetingNameType.LoginPage));
  }, []);

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
          {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="login-form-input" controlId="formBasicEmail">
                <Form.Label className="login-form-label">Email</Form.Label>

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

              <Form.Group className="login-form-input" controlId="formBasicPassword">
                <Form.Label className="login-form-label">Mật khẩu</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="password"
                    type="password"
                    // placeholder="Password"
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid" className="input-error">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="login-form-role-check">
                <div className="role_checker">Bác sĩ?</div>
                <Form.Check size={20} name="role" onChange={handleChange} id="validationFormik0" />
              </Form.Group>
              <div className="errors">{showError && <div>{showError}</div>}</div>

              <Button className="submitBtn" type="submit">
                Đăng nhập
              </Button>
              <Link className="create-account-link" to="./signup">
                Tạo tài khoản
              </Link>

              <Link className="backToHome" to="/">
                Về trang chủ
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
