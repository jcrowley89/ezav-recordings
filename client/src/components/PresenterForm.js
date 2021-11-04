import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";

const PresenterForm = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    programId,
    setProgramId,
    programs,
    onSubmit,
    disabled
}) => {
  return (
    <Form onSubmit={onSubmit} className="p-4 bg-light">
      <Row form>
        <Col>
          <FormGroup>
            <Label>
              First Name<span className="text-danger">*</span>
            </Label>
            <Input
              placeholder="First Name"
              value={firstName}
              disabled={disabled}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col>
          <FormGroup>
            <Label>
              Last Name<span className="text-danger">*</span>
            </Label>
            <Input
              placeholder="Last Name"
              value={lastName}
              disabled={disabled}
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
              disabled={disabled}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>
              Program<span className="text-danger">*</span>
            </Label>
            <Input type="select" value={programId} disabled={disabled} onChange={(e) => setProgramId(e.target.value)}>
              <option disabled selected>
                Select program...
              </option>
              {programs
                ? programs.map((p) => (
                    <option value={p.id}>
                      {p.clientName} - {p.eventTitle}
                    </option>
                  ))
                : null}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      {disabled ? <Spinner /> : (
      <Button color="primary" className="mt-3 rounded-pill">
        Submit
      </Button>
      )}
    </Form>
  );
};

export default PresenterForm;
