import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  ButtonGroup,
  UncontrolledAlert,
  Table,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loading, MainContent } from "./";
import { apiGet, apiDelete } from "../utils/api";

const AdminRow = ({ admin, onClick }) => {
  return (
    <tr>
      <td>
        {admin.lastName}, {admin.firstName}{" "}
        {admin.role === "developer" ? (
          <Badge color="secondary">Developer</Badge>
        ) : null}
      </td>
      <td>{admin.email}</td>
      <td>
        <ButtonGroup size="sm">
          <Button color="dark" tag={Link} to={`/admin/${admin.id}`}>
            <FontAwesomeIcon icon="eye" />
          </Button>
          {/* <Button color="secondary">
            <FontAwesomeIcon icon="edit" />
          </Button> */}
          <Button color="danger" onClick={onClick}>
            <FontAwesomeIcon icon="times" />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

const Admins = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trigger, setTrigger] = useState(new Date());
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await apiGet("admins");
      setAdmins(result.data);
      setIsLoading(false);
    })();
  }, [trigger]);

  async function deleteAdmin(id) {
    await apiDelete(`/admins/${id}`);
    setTrigger(new Date());
  }

  return (
    <div id="recordings">
      <MainContent heading="Admins" button btnLink="/new-admin">
        {!isLoading && admins && admins.length === 0 ? (
          <UncontrolledAlert color="primary">
            No admins found.
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {admins
                ? admins.map((u) => (
                    <AdminRow
                      admin={u}
                      key={u.id}
                      onClick={() => deleteAdmin(u.id)}
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

export default Admins;
