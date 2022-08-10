import React, { useContext, useState } from "react";
import { validateSignUp } from "../component/validations";

import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const FormSignup = ({ submitForm }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  return (
    <div
      className="top pb-5"
    >
      <h1 className="signup-text">
        Signup NOW!!!
      </h1>

      <div className="signup-form-container">
        <div
          style={{
            background: "rgba(182, 215, 179, 0.8)",
            border: "1px solid #495159",
            borderRadius: "3%",
            color: "#495159",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const _errors = validateSignUp(values);
              if (Object.keys(_errors).length > 0) {
                setErrors(_errors);
                console.log("errors were found onSubmit", _errors);
                return false;
              } else {
                setErrors({});
                console.log("no errors were found call formSignUp");
              }
              actions
                .formSignup(
                  values.name,
                  values.email,
                  values.password,
                  values.password2,
                )
                .then(() => navigate.push("/home"))
                .catch((error) => alert(error));
              console.log("form submitted");
            }}
            className="signup-form"
            noValidate
          >
            <div className="mb-3">
              <label className="signup-label">Name</label>
              <input
                className="signup-input"
                type="name"
                name="name"
                placeholder="Enter your name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="mb-3">
              <label className="signup-label">Email</label>
              <input
                className="signup-input"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="mb-3">
              <label className="signup-label">Password</label>
              <input
                className="signup-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className="mb-3">
              <label className="signup-label">Confirm Password</label>
              <input
                className="signup-input"
                type="password"
                name="password2"
                placeholder="Confirm your password"
                value={values.password2}
                onChange={(e) =>
                  setValues({ ...values, password2: e.target.value })
                }
              />
              {errors.password2 && <p>{errors.password2}</p>}
            </div>
            <button type="submit" className="btn btn-primary mb-3">
              Sign up
            </button>

            <span>
              Already have an account? Login{" "}
              <a href="Login" className="login-link">
                here
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormSignup;