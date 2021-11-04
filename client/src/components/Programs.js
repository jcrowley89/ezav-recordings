import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, UncontrolledAlert, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loading, MainContent } from "./";
import { apiGet, apiDelete } from "../utils/api";
import dates from "../utils/dates";
import { Link } from "react-router-dom";

const ProgramRow = ({ program, onClick }) => {
  return (
    <tr>
      <td>
        <strong>{program.clientName}</strong>
      </td>
      <td>{program.eventTitle}</td>
      <td>{`${dates.formatMMDD(new Date(program.beginsOn))}-${dates.formatMMDD(
        new Date(program.endsOn)
      )}`}</td>
      <td>
        <ButtonGroup size="sm">
          <Button color="dark" tag={Link} to={`/program/${program.id}`}>
            <FontAwesomeIcon icon="eye" />
          </Button>
          <Button
            color="secondary"
            tag={Link}
            to={`/edit-program/${program.id}`}
          >
            <FontAwesomeIcon icon="edit" />
          </Button>
          <Button color="danger" onClick={onClick}>
            <FontAwesomeIcon icon="times" />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

const Programs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [trigger, setTrigger] = useState(new Date());

  useEffect(() => {
    (async () => {
      const result = await apiGet("programs");
      setPrograms(result.data);
      setIsLoading(false);
    })();
  }, [trigger]);

  async function handleClick(id) {
    await apiDelete(`/programs/${id}`);
    setTrigger(new Date());
  }

  return (
    <div id="programs">
      <MainContent heading="Programs" button btnLink="/new-program">
        {!isLoading && programs && programs.length === 0 ? (
          <UncontrolledAlert color="primary">
            No programs found.
          </UncontrolledAlert>
        ) : null}
        {isLoading ? (
          <Loading />
        ) : (
          <Table striped borderless>
            <thead>
              <tr>
                <th>Client</th>
                <th>Event Title</th>
                <th>Dates</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {programs
                ? programs.map((p) => (
                    <ProgramRow
                      program={p}
                      key={p._id}
                      onClick={() => handleClick(p.id)}
                    />
                  ))
                : null}
            </tbody>
          </Table>
        )}
      </MainContent>
    </div>
  );
};

export default Programs;
