import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { apiGet, apiPut } from "../utils/api";
import { ProgramForm, MainContent } from "./";

const NewProgram = () => {
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [beginsOn, setBeginsOn] = useState(null);
  const [endsOn, setEndsOn] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await apiGet(`programs/${id}`);
      setEventTitle(res.data.eventTitle);
      setClientName(res.data.clientName);
      setBeginsOn(new Date(res.data.beginsOn).toISOString().substr(0,10));
      setEndsOn(new Date(res.data.endsOn).toISOString().substr(0,10));
    })();
  }, [id]);

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
        <ProgramForm
          onSubmit={handleSubmit}
          clientName={clientName}
          setClientName={setClientName}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          beginsOn={beginsOn}
          setBeginsOn={setBeginsOn}
          endsOn={endsOn}
          setEndsOn={setEndsOn}
        />
      </MainContent>
    </div>
  );
};

export default NewProgram;
