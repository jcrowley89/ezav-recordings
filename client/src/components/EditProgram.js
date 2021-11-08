import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { apiGet, apiPut } from "../utils/api";
import { ProgramForm, MainContent } from "./";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

const NewProgram = () => {
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [beginsOn, setBeginsOn] = useState("");
  const [endsOn, setEndsOn] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await apiGet(`programs/${id}`);
      setEventTitle(res.data.eventTitle);
      setClientName(res.data.clientName);
      setBeginsOn(new Date(res.data.beginsOn).toISOString().substr(0, 10));
      setEndsOn(new Date(res.data.endsOn).toISOString().substr(0, 10));
    })();
  }, [id]);

  useEffect(() => {
    if (
      eventTitle !== "" &&
      clientName !== "" &&
      beginsOn !== "" &&
      endsOn !== ""
    ) {
      setCanSubmit(true);
    }
  }, [eventTitle, clientName, beginsOn, endsOn]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      eventTitle,
      clientName,
      beginsOn,
      endsOn,
    };
    await apiPut(`programs/${id}`, payload);
    setSubmitted(true);
  }

  if (submitted) return <Redirect to="/programs" />;

  return (
    <div id="newProgram">
      <MainContent heading={`Edit Program ID#${id.padStart(3, 0)}`}>
        <Form onSubmit={handleSubmit} className="p-4 bg-light">
          <FormGroup>
            <Label>Client/Organization:</Label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Event Title:</Label>
            <Input
              value={eventTitle}
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
                  onChange={(e) => setEndsOn(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button
            color="primary"
            className="mt-3 rounded-pill"
            disabled={!canSubmit}
          >
            Submit
          </Button>
        </Form>
      </MainContent>
    </div>
  );
};

export default NewProgram;
