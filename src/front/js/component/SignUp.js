import React, { useContext, useState } from "react";
import { validateSignUp } from "./validations";
import lotus from "../../img/lotus.png";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const FormSignup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
	  const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();
  // const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleSubmit = e => {
    e.preventDefault();
    console.log(email, password, password2);
    actions
        .FormSignup(email, password, password2)
        .then(data => navigate.push("/home"))
        .catch(error => {
        setErrors(error);
        console.log("This is my error", error);
        });
    };


    return (
    <div className="top pb-5">
        <img className="signup-logo" src={lotus} />


        <div className="signup-form-container">
            <div style={{
                background: "rgba(182, 215, 179, 0.8)",
                border: "1px solid #495159",
                borderRadius: "3%",
                color: "#495159",
            }}
        >
            <form onSubmit={handleSubmit}
              // e.preventDefault();
              // const _errors = validateSignUp(values);
              // if (Object.keys(_errors).length > 0) {
              //   setErrors(_errors);
              //   console.log("errors were found onSubmit", _errors);
              //   return false;
              // } else {
              //   setErrors({});
              //   console.log("no errors were found call signup");
              // }
            //   actions
            //     .FormSignup(
            //       values.email,
            //       values.password,
            //       values.password2
            //     )
            //     .then(() => navigate.push("/main"))
            //     .catch((error) => alert(error));
            //   console.log("form submitted");
            // }}
            
            className="signup-form"
            noValidate
            >

                <div className="mb-3">
                    <label className="signup-label">Email</label>
                    <input
                    className="signup-input"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
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
                value={password2}
                onChange={e => setPassword2(e.target.value)}
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