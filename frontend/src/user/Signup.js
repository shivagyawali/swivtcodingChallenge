import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import "../style.css";
const Signup = () => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { fullname, email, password, error, success } = values;

  const handleChange = (fullname) => (event) => {
    setValues({ ...values, error: false, [fullname]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ fullname, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            fullname: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="form">
        <div className="card-panel grey lighten-3">
          <h5>Please Enter the Credential</h5>
          <div className="row">
            <form>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    onChange={handleChange("fullname")}
                    type="text"
                    value={fullname}
                  />
                  <label for="fullname">Enter Name</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    onChange={handleChange("email")}
                    type="email"
                    value={email}
                  />
                  <label for="email">Your Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    onChange={handleChange("password")}
                    type="password"
                    value={password}
                  />
                  <label for="password">Your Password</label>
                </div>
              </div>
              <div className="row">
                <button
                  onClick={onSubmit}
                  className="btn btn-success btn-block"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
