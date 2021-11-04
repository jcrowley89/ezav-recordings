import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Table } from "reactstrap";
import { MainContent } from ".";
import { apiGet } from "../utils/api";

const Admin = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    (async () => {
      const result = await apiGet(`admins/${id}`);
      setAdmin(result.data);
    })();
  }, [id]);

  return (
    <div id="admin">
      <MainContent heading={`Admin ID#${id.padStart(3, 0)}`}>
        <Table bordered>
            <tbody>
                <tr>
                    <th>First Name:</th>
                    <td>{admin && admin.firstName}</td>
                </tr>
                <tr>
                    <th>Last Name:</th>
                    <td>{admin && admin.lastName}</td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>{admin && admin.email}</td>
                </tr>
            </tbody>
        </Table>
      </MainContent>
    </div>
  );
};

export default Admin;
