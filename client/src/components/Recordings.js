import React, { useEffect, useState, useContext } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Table,
  UncontrolledAlert,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Loading, MainContent } from "./";
import { apiGet, apiDelete } from "../utils/api";
import AppContext from "../AppContext";

const RecordingRow = ({ recording, onClick }) => {
  const { currentUser } = useContext(AppContext);
  return (
    <tr>
      <td>
        {currentUser?.id === recording.presenterId ? (
          <strong>{`${recording.presenterLastName}, ${recording.presenterFirstName}`}</strong>
        ) : (
          `${recording.presenterLastName}, ${recording.presenterFirstName}`
        )}
      </td>
      <td>
      {currentUser?.id === recording.presenterId ? (
        <strong>{recording.presentationTitle}</strong>
      ) : (
        recording.presentationTitle
      )}
        
        </td>
      <td>
        {recording.clientName} - {recording.eventTitle}
      </td>

      <td>
        {recording.completedAt ? (
          <Badge color="success">Completed</Badge>
        ) : (
          <Badge color="warning">Pending</Badge>
        )}
      </td>

      {currentUser?.role === "admin" || currentUser?.role === "developer" ? (
        <td>
          <ButtonGroup size="sm">
            <Button color="dark" tag={Link} to={`/recording/${recording.id}`}>
              <FontAwesomeIcon icon="eye" />
            </Button>
            <Button color="danger" onClick={onClick}>
              <FontAwesomeIcon icon="times" />
            </Button>
          </ButtonGroup>
        </td>
      ) : (
        <td>
          {currentUser?.role === "presenter" && currentUser?.id === recording.presenterId ? (
            <Button size="sm" color="danger" tag={Link} to={`/record/${recording.id}`} ><FontAwesomeIcon icon="circle" className="mr-2" />Record</Button>
          ) : null}
        </td>
      )}
    </tr>
  );
};

const Recordings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recordings, setRecordings] = useState([]);
  const [trigger, setTrigger] = useState(new Date());

  useEffect(() => {
    (async () => {
      const result = await apiGet("recordings");
      setRecordings(result.data);
      setIsLoading(false);
    })();
  }, [trigger]);

  async function handleClick(id) {
    await apiDelete(`/recordings/${id}`);
    setTrigger(new Date());
  }

  return (
    <div id="recordings">
      <MainContent heading="Recordings" button btnLink="/new-recording">
        {!isLoading && recordings && recordings.length === 0 ? (
          <UncontrolledAlert color="primary">
            No recordings found.
          </UncontrolledAlert>
        ) : null}
        {isLoading ? (
          <Loading />
        ) : (
          <Table borderless striped>
            <thead>
              <tr>
                <th>Presenter</th>
                <th>Presentation Title</th>
                <th>Program</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recordings
                ? recordings.map((r) => (
                    <RecordingRow
                      recording={r}
                      key={r.id}
                      onClick={() => handleClick(r.id)}
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

export default Recordings;
