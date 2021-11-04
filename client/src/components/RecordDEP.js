import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, ButtonGroup } from "reactstrap";
import { Monitor, Slide } from "./";
import { apiGet } from "../utils/api";
import { usePresentation } from "../utils/usePresentation";
import { MEDIA_URL } from "../utils/constants";

// import slide1 from "../temp/presentation/1.png";
// import slide2 from "../temp/presentation/2.png";
// import slide3 from "../temp/presentation/3.png";
// import slide4 from "../temp/presentation/4.png";
// import slide5 from "../temp/presentation/5.png";
// import slide6 from "../temp/presentation/6.png";
// import slide7 from "../temp/presentation/7.png";
// import slide8 from "../temp/presentation/8.png";
// import slide9 from "../temp/presentation/9.png";

// const slides = [
//   slide1,
//   slide2,
//   slide3,
//   slide4,
//   slide5,
//   slide6,
//   slide7,
//   slide8,
//   slide9,
// ];

const Record = () => {
  const { id } = useParams();
  const [slides, setSlides] = useState([]);
  const [recording, setRecording] = useState();
  const [flagCount, setFlagCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const monitorRef = useRef(null);
  const currentSlide = useRef(0);
  const interval = useRef(null);
  const [presCanvasRef, drawSlide] = usePresentation(slides, currentSlide);

  useEffect(() => {
    (async () => {
      const result = await apiGet(`recordings/${id}`);
      setRecording(result.data);
    })();
  }, []);

  useEffect(() => {
    if (recording) {
      const filename = recording.presentationFile.split(".")[0];
      const slideArr = [];
      for (let i = 1; i <= recording.numSlides; i++) {
        slideArr.push(`${MEDIA_URL}${filename}-out-${i}.png`);
      }
      setSlides(slideArr);
    }
  }, [recording]);

  useEffect(() => {
    const firstSlide = document.querySelector("img.slide");
    if (firstSlide) {
      presCanvasRef.current.width = firstSlide.naturalWidth;
      presCanvasRef.current.height = firstSlide.naturalHeight;
      drawSlide(currentSlide.current);
    }
  }, [presCanvasRef, recording, slides]);

  function prevSlide() {
    if (currentSlide.current === 0) {
      currentSlide.current = slides.length - 1;
    } else {
      currentSlide.current--;
    }
    drawSlide(currentSlide.current);
  }

  function nextSlide() {
    if (currentSlide.current === slides.length - 1) {
      currentSlide.current = 0;
    } else {
      currentSlide.current++;
    }
    drawSlide(currentSlide.current);
  }

  // function handleDataAvailable(e) {
  //   if (typeof e.data === "undefined") return;
  //   if (e.data.size === 0) return;
  //   // chunks.push(event.data);
  // }

  function handleInterval() {
    setTime((time) => time + 1);
  }

  function toHHMMSS(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time - hours * 3600 - minutes * 60;

    hours = `${hours}`.padStart(2, "0");
    minutes = `${minutes}`.padStart(2, "0");
    seconds = `${seconds}`.padStart(2, "0");

    return hours + ":" + minutes + ":" + seconds;
  }

  function startRecording() {
    const recStream = monitorRef.current.captureStream(30);
    // mediaStream.getAudioTracks().forEach((t) => recStream.addTrack(t));
    const recorder = new MediaRecorder(recStream, { type: "video/webm" });
    // recorder.addEventListener("dataavailable", handleDataAvailable);
    // recorder.start();
    //recordIndicator.className += " blink";
    // timer.className = "bg-dark text-danger d-flex align-items-center justify-content-center px-4";
    setIsRecording(true);
    interval.current = setInterval(handleInterval, 1000);

    // recorder.addEventListener("stop", () => {
    //   stream.getTracks().forEach(track => track.stop());
    //   toolbar.innerHTML = "";
    //   const recording = new Blob(chunks, {
    //     type: "video/webm",
    //   });
    //   renderRecording(recording);
    //   chunks = [];
    // });
  }

  const recorder = {
    stop: () => {
      setIsRecording(false);
      clearInterval(interval.current);
    },
  };

  return (
    <div id="recordingLayout">
      <div id="slideDeck" className="bg-light shadow p-3">
        {slides &&
          slides.map((s, i) => (
            <Slide slide={s} i={i} onClick={() => drawSlide(i)} />
          ))}
      </div>
      <div id="recordWindow" className="px-4 py-3">
        <h2>
          {recording && recording.presentationTitle} /{" "}
          <small className="text-muted">
            by {recording && recording.presenterFirstName}{" "}
            {recording && recording.presenterLastName}
          </small>
        </h2>
        <hr />

        {isPlaying ? (
          <>
            <Monitor ref={monitorRef} presCanvasRef={presCanvasRef} />
            <div className="d-flex justify-content-center">
              <Button outline color="secondary" onClick={prevSlide}>
                <FontAwesomeIcon icon="angle-left" /> Prev. Slide
              </Button>
              <ButtonGroup className="mx-3">
                <Button
                  color="danger"
                  onClick={startRecording}
                  disabled={isRecording}
                >
                  <FontAwesomeIcon
                    icon="circle"
                    className={isRecording ? "blink" : ""}
                  />{" "}
                  Record
                </Button>
                <div
                  id="timer"
                  className={`bg-dark d-flex align-items-center justify-content-center px-4 ${
                    isRecording ? "text-danger" : "text-light"
                  }`}
                >
                  {toHHMMSS(time)}
                </div>
                <Button
                  color="secondary"
                  onClick={recorder.stop}
                  disabled={!isRecording}
                >
                  <FontAwesomeIcon icon="square" /> Stop
                </Button>
                <Button
                  color="warning"
                  onClick={() => setFlagCount(flagCount + 1)}
                  disabled={!isRecording}
                >
                  <FontAwesomeIcon icon="flag" /> Flag{" "}
                  <Badge color="dark">{flagCount}</Badge>
                </Button>
              </ButtonGroup>
              <Button outline color="secondary" onClick={nextSlide}>
                Next Slide <FontAwesomeIcon icon="angle-right" />
              </Button>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center p-5">
            <div>
              <h3>Grant Access to Media Devices</h3>
              <p className="lead">
                In order to use this application we need to access your video
                and audio devices. After clicking the start button below you may
                be prompted to grant permission. Please click on "allow" if
                prompted.
              </p>
              <Button color="primary" onClick={() => setIsPlaying(true)}>
                Start
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Record;
