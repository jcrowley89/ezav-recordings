import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { MainContent } from "./";
import { apiPostFD } from "../utils/api";
import AppContext from "../AppContext";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";

const NewRecording = () => {
  const [submitted, setSubmitted] = useState(false);
  const [presentationTitle, setPresentationTitle] = useState("");
  const [presentationFile, setPresentationFile] = useState(undefined);
  const [disabled, setDisabled] = useState(false);
  const [newId, setNewId] = useState();
  const [canSubmit, setCanSubmit] = useState(false);
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    if (presentationTitle !== "" && presentationFile !== undefined) {
      setCanSubmit(true);
    }
  }, [presentationTitle, presentationFile]);

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const dateString = Date.now().toString();
    const fd = new FormData();
    fd.append("dateString", dateString);
    fd.append("presentationTitle", presentationTitle);
    fd.append("presentation", presentationFile);
    fd.append("presenterId", currentUser.id);
    const res = await apiPostFD("recordings", fd);
    setNewId(res.data.id);
    setSubmitted(true);
  }

  if (submitted) return <Redirect to={`/record/${newId}`} />;

  return (
    <div id="newRecording">
      <MainContent heading="Setup New Recording">
        <p className="lead">
          Please enter your information below to set up a new recording.
        </p>
        <Form onSubmit={handleSubmit} className="p-4 bg-light">
          <FormGroup>
            <Label>Presentation Title:</Label>
            <Input
              required
              disabled={disabled}
              value={presentationTitle}
              onChange={(e) => setPresentationTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Upload Presentation File:</Label>
            <Input
              required
              disabled={disabled}
              type="file"
              onChange={(e) => setPresentationFile(e.target.files[0])}
            />
          </FormGroup>
          {disabled ? (
            <div>
              <Spinner /> Uploading and Processing... (This may take a few
              minutes)
            </div>
          ) : (
            <Button
              color="primary"
              className="mt-3 rounded-pill"
              disabled={!canSubmit}
            >
              Submit
            </Button>
          )}
        </Form>
      </MainContent>
    </div>
  );
};

export default NewRecording;
