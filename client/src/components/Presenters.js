import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Table, UncontrolledAlert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loading, MainContent } from "./";
import { apiGet, apiDelete } from "../utils/api";
import { Link } from "react-router-dom";

const PresenterRow = ({ presenter, onClick }) => {
  return (
    <tr>
      <td>
        <strong>
          {presenter.lastName}, {presenter.firstName}
        </strong>
      </td>
      <td>{presenter.email}</td>
      <td>
        {presenter.clientName} - {presenter.eventTitle}
      </td>
      <td>
        <span className="h6 card bg-light p-1 text-center">
          {presenter.code}
        </span>
      </td>
      <td>
        <ButtonGroup size="sm">
          <Button color="dark" tag={Link} to={`/presenter/${presenter.id}`}>
            <FontAwesomeIcon icon="eye" />
          </Button>
          <Button
            color="secondary"
            tag={Link}
            to={`/edit-presenter/${presenter.id}`}
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

const Presenters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(new Date());

  useEffect(() => {
    (async () => {
      const result = await apiGet("presenters");
      setData(result.data);
      setIsLoading(false);
    })();
  }, [trigger]);

  async function deletePresenter(id) {
    await apiDelete(`/presenters/${id}`);
    setTrigger(new Date());
  }
  return (
    <div id="presenters">
      <MainContent heading="Presenters" button btnLink="/new-presenter">
        {!isLoading && data && data.length === 0 ? (
          <UncontrolledAlert color="primary">
            No presenters found.
          </UncontrolledAlert>
        ) : null}
        {isLoading ? (
          <Loading />
        ) : (
          <Table borderless striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Program</th>
                <th>Access Code</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((p) => (
                  <PresenterRow
                    presenter={p}
                    onClick={() => deletePresenter(p.id)}
                  />
                ))}
            </tbody>
          </Table>
        )}
      </MainContent>
    </div>
  );
};

export default Presenters;
