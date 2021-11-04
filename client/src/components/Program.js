import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Table } from "reactstrap";
import { MainContent } from ".";
import { apiGet } from "../utils/api";
import dates from "../utils/dates";
import { MEDIA_URL } from "../utils/constants";

const Program = () => {
  const { id } = useParams();
  const [program, setProgram] = useState();

  useEffect(() => {
    (async () => {
      const result = await apiGet(`programs/${id}`);
      setProgram(result.data);
    })();
  }, [id]);

  return (
    <div id="program">
      <MainContent heading={`Program ID#${id.padStart(3, 0)}`}>
        <Table bordered>
          <tbody>
            <tr>
              <th>Client Name:</th>
              <td>{program?.clientName}</td>
            </tr>
            <tr>
              <th>Event Title:</th>
              <td>{program?.eventTitle}</td>
            </tr>
            <tr>
              <th>Dates:</th>
              <td>
                {program &&
                  `${dates
                    .fixTimeZone(new Date(program.beginsOn))
                    .toDateString()}-${dates
                    .fixTimeZone(new Date(program.endsOn))
                    .toDateString()}`}
              </td>
            </tr>
            <tr>
              <th>Logo:</th>
              <td>
                <img
                  src={
                    program && `${MEDIA_URL}${program.logo}.png`
                  }
                  alt="logo"
                  className="logo-preview"
                />
              </td>
            </tr>
            <tr>
              <th>Video Frame:</th>
              <td>
                <img
                  src={
                    program && `${MEDIA_URL}${program.frame}.png`
                  }
                  alt="video frame"
                  className="frame-preview"
                />
              </td>
            </tr>
            <tr>
              <th>Created At:</th>
              <td>{program && new Date(program.createdAt).toString()}</td>
            </tr>
            <tr>
              <th>Updated At:</th>
              <td>{program && new Date(program.updatedAt).toString()}</td>
            </tr>
          </tbody>
        </Table>
      </MainContent>
    </div>
  );
};

export default Program;
