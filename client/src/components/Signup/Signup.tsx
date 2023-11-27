import "./signup.scss";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as yup from "yup";
import { Formik } from "formik";

import { Button, Form, InputGroup } from "react-bootstrap";

import Abstract13 from "assets/abstract13.svg";
import { useApi } from "utils/api";

interface IFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: boolean;
}

const SignupSchema = yup.object().shape({
  fullName: yup.string().required("Name required!"),
  email: yup.string().email("Must be a valid email!").required("Email required!"),
  password: yup.string().min(6).required("Password required!"),
  confirmPassword: yup
    .string()
    .required("Confirm password required!")
    .test("Password matched!", "Password unmatched!", function (value) {
      return this.parent.password === value;
    }),
});

const Signup = () => {
  const navigate = useNavigate();

  const [errorSignup, setErrorSignup] = useState<string>();

  const api = useApi();

  const handleSubmit = (data: IFormData) => {
    const { role, ...accountInfo } = data;
    if (role)
      api
        .post("/user", {
          ...accountInfo,
          role: "doctor",
        })
        .then(() => navigate("/login"))
        .catch((e) => setErrorSignup(e.message));
    if (!role)
      api
        .post("/user", {
          ...accountInfo,
          role: "patient",
        })
        .then(() => navigate("/login"))
        .catch((e) => setErrorSignup(e.message));
  };

  return (
    <div className="signup-form">
      <img src={Abstract13} className="backgroundLogin" alt="background" />
      <div className="signup-content">
        <h1 className="signup-form-title">Đăng kí tài khoản</h1>
        {errorSignup && <div style={{ color: "red" }}>{errorSignup}</div>}
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="signup-form-input" controlId="fullName">
                <Form.Label className="signup-form-label">Họ tên</Form.Label>
                <Form.Control
                  type="fullName"
                  name="fullName"
                  value={values.fullName}
                  placeholder="Enter Full Name"
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.fullName}
                />
                <Form.Control.Feedback type="invalid" className="input-error">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="signup-form-input" controlId="email">
                <Form.Label className="signup-form-label">Email</Form.Label>
                <Form.Control type="email" name="email" value={values.email} placeholder="Enter email" onChange={handleChange} isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid" className="input-error">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="signup-form-input" controlId="password">
                <Form.Label className="signup-form-label">Mật khẩu</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control name="password" type="password" value={values.password} placeholder="Password" onChange={handleChange} isInvalid={!!errors.password} />
                  {/* <InputGroup.Text onClick={handleVisiblePassword}>
                    {isPasswordShow && <EyeOutlined />}
                    {!isPasswordShow && <EyeInvisibleOutlined />}
                  </InputGroup.Text> */}
                  <Form.Control.Feedback type="invalid" className="input-error">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="signup-form-input" controlId="confirm-password">
                <Form.Label className="signup-form-label">Xác nhận mật khẩu</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                  />
                  {/* <InputGroup.Text onClick={handleVisiblePassword}>
                    {isPasswordShow && <EyeOutlined />}
                    {!isPasswordShow && <EyeInvisibleOutlined />}
                  </InputGroup.Text> */}
                  <Form.Control.Feedback type="invalid" className="input-error">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3 d-flex align-items-center">
                <div className="me-3 fw-bold fs-6">Bác sĩ?</div>
                <Form.Check size={20} name="role" onChange={handleChange} feedback={errors.role} id="validationFormik0" />
                <Link className="ms-auto fs-6" to="./login">
                  Đã có tài khoản?
                </Link>
              </Form.Group>
              <div className="submit-button">
                <Button type="submit">Đăng kí</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
