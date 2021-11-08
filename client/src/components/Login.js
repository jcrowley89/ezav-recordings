import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { Alert, Button, Container, Form, Input } from "reactstrap";
import AppContext from "../AppContext";
import { apiPost } from "../utils/api";

import Logo from "../img/ezav_logo.png";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    apiPost("login", {
      email,
      password,
    }).then(res => {
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setCurrentUser(res.data.user);
      } else {
        setMsg("There was an error.");
      }
    }).catch(err => {
      if (err.response && err.response.status === 401) {
        setShowAlert(true);
      setMsg("Incorrect email and/or password.");
      }
    });
  }

  if (currentUser) return <Redirect to="/home" />;

  return (
    <div id="login" className="p-5">
      <Container>
        <div className="card card-container p-4 shadow">
          <img src={Logo} alt="profile-img" className="profile-img-card" />
          {/* <h3 className="mt-3">Login</h3> */}
          <hr />
          {showAlert ? <Alert color="danger" toggle={() => setShowAlert(false)}>{msg}</Alert> : null}
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Email Address</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password or Access Code</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <Button block color="primary" className="rounded-pill">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
