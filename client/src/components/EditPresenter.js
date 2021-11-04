import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { apiGet, apiPut } from "../utils/api";
import { PresenterForm, MainContent } from "./";

const EditPresenter = () => {
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [programId, setProgramId] = useState("");

  useEffect(() => {
    (async () => {
      const result = await apiGet("programs");
      setPrograms(result.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await apiGet(`presenters/${id}`);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      setProgramId(res.data.programId);
    })();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      firstName,
      lastName,
      email,
      programId,
    };
    await apiPut("presenters", payload);
    setSubmitted(true);
  }

  if (submitted) return <Redirect to="/presenters" />;

  return (
    <div id="editPresenter">
      <MainContent heading={`Edit Presenter ID#${id.padStart(3, 0)}`}>
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
        />
      </MainContent>
    </div>
  );
};

export default EditPresenter;
