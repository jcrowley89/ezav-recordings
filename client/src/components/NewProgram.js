import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { apiPostFD } from "../utils/api";
import { MainContent } from "./";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Spinner,
} from "reactstrap";

const NewProgram = () => {
  const [submitted, setSubmitted] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [beginsOn, setBeginsOn] = useState(null);
  const [endsOn, setEndsOn] = useState(null);
  const [logoFile, setLogoFile] = useState(undefined);
  const [frameFile, setFrameFile] = useState(undefined);
  const [disabled, setDisabled] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const dateString = Date.now().toString();
    const fd = new FormData();
    fd.append("dateString", dateString);
    fd.append("eventTitle", eventTitle);
    fd.append("clientName", clientName);
    fd.append("beginsOn", beginsOn);
    fd.append("endsOn", endsOn);
    fd.append("logo", logoFile);
    fd.append("frame", frameFile);
    apiPostFD("programs", fd).then(() => setSubmitted(true));
  }

  if (submitted) return <Redirect to="/programs" />;

  return (
    <div id="newProgram">
      <MainContent heading="Add New Program">
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="POST"
          action="/api/programs"
          className="p-4 bg-light"
        >
          <FormGroup>
            <Label>Client/Organization:</Label>
            <Input
              value={clientName}
              disabled={disabled}
              onChange={(e) => setClientName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Event Title:</Label>
            <Input
              value={eventTitle}
              disabled={disabled}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </FormGroup>
          <Row>
            <Col>
              <FormGroup>
                <Label>Begins On:</Label>
                <Input
                  type="date"
                  value={beginsOn}
                  disabled={disabled}
                  onChange={(e) => setBeginsOn(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Ends On:</Label>
                <Input
                  type="date"
                  value={endsOn}
                  disabled={disabled}
                  onChange={(e) => setEndsOn(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <FormGroup>
                <Label>Logo:</Label>
                <Input
                  type="file"
                  name="logo"
                  disabled={disabled}
                  onChange={(e) => setLogoFile(e.target.files[0])}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Video Frame:</Label>
                <Input
                  type="file"
                  name="frame"
                  disabled={disabled}
                  onChange={(e) => setFrameFile(e.target.files[0])}
                />
              </FormGroup>
            </Col>
          </Row>
          {disabled ? (
            <div>
              <Spinner /> Uploading... (This may take a few minutes)
            </div>
          ) : (
            <Button color="primary" className="mt-3 rounded-pill">
              Submit
            </Button>
          )}
        </Form>
      </MainContent>
    </div>
  );
};

export default NewProgram;
