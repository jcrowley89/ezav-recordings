import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

const ProgramForm = ({
  onSubmit,
  clientName,
  setClientName,
  eventTitle,
  setEventTitle,
  beginsOn,
  setBeginsOn,
  endsOn,
  setEndsOn,
  logoRef,
  frameRef,
}) => {
  return (
    <Form onSubmit={onSubmit} className="p-4 bg-light">
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
      <Row className="mt-3">
        <Col>
          <FormGroup>
            <Label>Logo:</Label>
            <Input
              type="file"
              ref={logoRef}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Video Frame:</Label>
            <Input
              type="file"
              ref={frameRef}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary" className="mt-3 rounded-pill">
        Submit
      </Button>
    </Form>
  );
};

export default ProgramForm;
