import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { MainContent } from ".";
import { apiGet } from "../utils/api";
import { MEDIA_URL } from "../utils/constants";

const Recording = () => {
  const { id } = useParams();
  const [recording, setRecording] = useState();

  useEffect(() => {
    (async () => {
      const result = await apiGet(`recordings/${id}`);
      setRecording(result.data);
    })();
  }, [id]);

  function listSlides() {
    const prefix = recording.presentationFile.split(".")[0];
    let list = [];
    for (let i = 1; i <= recording.numSlides; i++) {
      list.push(
        <img
          src={`${MEDIA_URL}${prefix}-out-${i}.png`}
          alt={`slide ${i}`}
          key={i}
          className="slide-preview"
        />
      );
    }
    return list;
  }

  return (
    <div id="recording">
      <MainContent heading={`Recording ID#${id.padStart(3, 0)}`}>
        <Table bordered>
          <tbody>
            <tr>
              <th>Presentation Title:</th>
              <td>{recording && recording.presentationTitle}</td>
            </tr>
            <tr>
              <th>Program:</th>
              <td>
                {recording &&
                  `${recording.clientName} - ${recording.eventTitle}`}
              </td>
            </tr>
            <tr>
              <th>Presenter:</th>
              <td>
                {recording && recording.presenterLastName},{" "}
                {recording && recording.presenterFirstName}
              </td>
            </tr>
            <tr>
              <th>Presenter Email:</th>
              <td>{recording && recording.presenterEmail}</td>
            </tr>
            {recording && recording.recordingFile ? (
              <tr>
                <th>Recorded Video File:</th>
                <td>
                  {" "}
                  <a
                    href={recording && `${MEDIA_URL}${recording.recordingFile}`}
                  >
                    {recording && `${recording.recordingFile}`}
                  </a>
                </td>
              </tr>
            ) : null}
            {recording && recording.flags && recording.flags.length > 0 ? (
              <tr>
                <th>Flags:</th>
                <td>{recording.flags.map(f => <span>{f}, </span>)}</td>
              </tr>
            ) : null}
            <tr>
              <th>Presentation Source File:</th>
              <td>
                <a
                  href={
                    recording && `${MEDIA_URL}${recording.presentationFile}`
                  }
                >
                  {recording && `${recording.presentationFile}`}
                </a>
              </td>
            </tr>
            <tr>
              <th>Presentation Output Files:</th>
              <td>{recording && listSlides()}</td>
            </tr>
            <tr>
              <th>Created At:</th>
              <td>{recording && new Date(recording.createdAt).toString()}</td>
            </tr>
            <tr>
              <th>Updated At:</th>
              <td>{recording && new Date(recording.updatedAt).toString()}</td>
            </tr>
          </tbody>
        </Table>
      </MainContent>
    </div>
  );
};

export default Recording;
