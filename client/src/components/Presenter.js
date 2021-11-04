import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Table } from "reactstrap";
import { MainContent } from ".";
import { apiGet } from "../utils/api";

const Presenter = () => {
  const { id } = useParams();
  const [presenter, setPresenter] = useState();
  const [program, setProgram] = useState();

  async function getPresenter(id) {
    const res = await apiGet(`presenters/${id}`);
    setPresenter(res.data);
  }

  async function getProgram(id) {
    const res = await apiGet(`programs/${id}`);
    setProgram(res.data);
  }

  useEffect(() => {
    getPresenter(id);
  }, [id]);

  useEffect(() => {
      getProgram(presenter?.ProgramId);
  }, [presenter]);

  return (
    <div id="presenter">
      <MainContent heading={`Presenter ID#${id.padStart(3, 0)}`}>
        <Table bordered>
          <tbody>
              <tr>
                  <th>First Name:</th>
                  <td>{presenter && presenter.firstName}</td>
              </tr>
              <tr>
                  <th>Last Name:</th>
                  <td>{presenter && presenter.lastName}</td>
              </tr>
              <tr>
                  <th>Email:</th>
                  <td>{presenter && presenter.email}</td>
              </tr>
              <tr>
                  <th>Access Code:</th>
                  <td>{presenter && presenter.code}</td>
              </tr>
              <tr>
                  <th>Program:</th>
                  <td>{program && `${program.clientName} - ${program.eventTitle}`}</td>
              </tr>
              <tr>
                <th>Created At:</th>
                <td>{program && new Date(presenter.createdAt).toString()}</td>
              </tr>
              <tr>
                <th>Updated At:</th>
                <td>{program && new Date(presenter.updatedAt).toString()}</td>
              </tr>
          </tbody>
        </Table>
      </MainContent>
    </div>
  );
};

export default Presenter;
