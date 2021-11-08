import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { UncontrolledAlert } from "reactstrap";
import { apiGet, apiPost } from "../utils/api";
import { MainContent, PresenterForm } from "./";

const NewPresenter = () => {
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [programId, setProgramId] = useState("");
  const [msg, setMsg] = useState();
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await apiGet("programs");
      setPrograms(result.data);
    })();
  }, []);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      programId !== ""
    ) {
      setCanSubmit(true);
    }
  }, [firstName, lastName, email, programId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const payload = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      programId,
    };
    apiPost("presenters", payload)
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        if (err && err.response) {
          setMsg(err.response.data.msg);
          setDisabled(false);
        }
      });
  }

  if (submitted) return <Redirect to="/presenters" />;

  return (
    <div id="newRecording">
      <MainContent heading="Add New Presenter">
        {msg ? (
          <UncontrolledAlert color="danger">{msg}</UncontrolledAlert>
        ) : null}
        <PresenterForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          programId={programId}
          setProgramId={setProgramId}
          programs={programs}
          onSubmit={handleSubmit}
          disabled={disabled}
          canSubmit={canSubmit}
        />
      </MainContent>
    </div>
  );
};

export default NewPresenter;
