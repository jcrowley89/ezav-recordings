import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { apiPost } from "../utils/api";
import { MainContent } from "./";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

const NewAdmin = () => {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  async function submitAdmin() {
    const payload = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
    };
    await apiPost("admins", payload);
    setSubmitted(true);
  }

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      password === confirmPwd
    ) {
      setCanSubmit(true);
    }
  }, [firstName, lastName, email, password, confirmPwd]);

  if (submitted) return <Redirect to="/admins" />;

  return (
    <div id="newRecording">
      <MainContent heading="Add New Admin">
        {/* {msg ? <Alert color="success">{msg}</Alert> : null} */}
        <Form className="p-4 bg-light">
          <Row form>
            <Col>
              <FormGroup>
                <Label>
                  First Name<span className="text-danger">*</span>
                </Label>
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>
                  Last Name<span className="text-danger">*</span>
                </Label>
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Label>
                  Email Address<span className="text-danger">*</span>
                </Label>
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Label>
                  Password<span className="text-danger">*</span>
                </Label>
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>
                  Confirm Password<span className="text-danger">*</span>
                </Label>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  invalid={password !== confirmPwd}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" className="mt-3 rounded-pill" onClick={submitAdmin} disabled={!canSubmit}>
            Submit
          </Button>
        </Form>
      </MainContent>
    </div>
  );
};

export default NewAdmin;
