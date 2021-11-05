import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, ButtonGroup } from "reactstrap";
import { Loading, Monitor, Slide } from "./";
import { apiGet } from "../utils/api";
import { MEDIA_URL } from "../utils/constants";
import { toHHMMSS } from "../utils/helpers";
import AppContext from "../AppContext";

const Record = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AppContext);
  const [numSlidesLoaded, setNumSlidesLoaded] = useState(0);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [mediaStream, setMediaStream] = useState();
  const [flagCount, setFlagCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [slides, setSlides] = useState([]);
  const [data, setData] = useState();
  const [program, setProgram] = useState();

  const monitorRef = useRef(null);
  const presCanvasRef = useRef(document.createElement("canvas"));
  const currentSlide = useRef(0);
  const videoRef = useRef(document.createElement("video"));
  const frameRef = useRef(document.createElement("img"));

  const scale = 94;
  const mediaOpts = {
    audio: true,
    video: true,
  };

  useEffect(() => {
    apiGet(`recordings/${id}`).then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      apiGet(`programs/${currentUser.programId}`).then((res) => {
        setProgram(res.data);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (program) {
      frameRef.current.src = `${MEDIA_URL}${program.frame}.png`;
      frameRef.current.onload = () => setFrameLoaded(true);
    }
  }, [program]);

  useEffect(() => {
    if (data) {
      const filename = data.presentationFile.split(".")[0];
      const slideArr = [];
      for (let i = 1; i <= data.numSlides; i++) {
        slideArr.push(`${MEDIA_URL}${filename}-out-${i}.png`);
      }
      setSlides(slideArr);
    }
  }, [data]);

  useEffect(() => {
    if (isReady) {
      navigator.mediaDevices
        .getUserMedia(mediaOpts)
        .then((stream) => setMediaStream(stream));
    }
  }, [isReady]);

  useEffect(() => {
    if (isReady && mediaStream) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.oncanplay = handleCanPlay;
      videoRef.current.muted = true;
    }
  }, [isReady, mediaStream]);

  useEffect(() => {
    if (isPlaying) {
      const videoHeight = videoRef.current.srcObject
        .getVideoTracks()[0]
        .getSettings().height;
      const videoWidth = videoRef.current.srcObject
        .getVideoTracks()[0]
        .getSettings().width;
      update(
        videoRef.current,
        presCanvasRef.current,
        monitorRef.current.getContext("2d"),
        frameRef.current,
        videoWidth,
        videoHeight
      );
    }
  }, [isPlaying]);

  // TODO: Cleanup :/
  useEffect(() => {
    if (mediaStream) {
      return () => {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
  }, [mediaStream]);

  // async function getStream() {
  //   setIsReady(true);
  // }

  function handleCanPlay() {
    videoRef.current.play();
    setIsPlaying(true);
  }

  function update(video, presCanvas, videoCtx, frame, videoWidth, videoHeight) {
    videoCtx.drawImage(
      video,
      (videoWidth - videoHeight) / 2,
      0,
      videoHeight,
      videoHeight,
      1547,
      297,
      357,
      355
    );
    videoCtx.drawImage(
      presCanvas,
      0,
      0,
      presCanvas.width,
      presCanvas.height,
      20,
      125,
      16 * scale,
      9 * scale
    );
    videoCtx.drawImage(frame, 0, 0);
    requestAnimationFrame(() =>
      update(video, presCanvas, videoCtx, frame, videoWidth, videoHeight)
    );
  }

  if (presCanvasRef.current && numSlidesLoaded == data?.numSlides) {
    const firstSlide = document.querySelector("img.slide");
    if (firstSlide) {
      presCanvasRef.current.width = firstSlide.naturalWidth;
      presCanvasRef.current.height = firstSlide.naturalHeight;
      drawSlide(currentSlide.current);
    }
  }

  function drawSlide(n) {
    const presCanvasCtx = presCanvasRef.current.getContext("2d");
    const slideWrappers = document.querySelectorAll(".slide-wrapper");
    slideWrappers.forEach((e) => e.classList.remove("active"));
    slideWrappers[n].classList.add("active");
    currentSlide.current = n;
    const allSlides = document.querySelectorAll(".slide");
    presCanvasCtx.globalAlpha = 0;
    let newSlide = allSlides[n];
    newSlide.classList.add("active");
    function fadeIn() {
      if (presCanvasCtx.globalAlpha >= 0.9) {
        presCanvasCtx.globalAlpha = 1;
        presCanvasCtx.drawImage(newSlide, 0, 0);
      } else {
        presCanvasCtx.globalAlpha += 0.05;
        presCanvasCtx.drawImage(newSlide, 0, 0);
        requestAnimationFrame(fadeIn);
      }
    }
    requestAnimationFrame(fadeIn);
  }

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

  return (
    <div id="recordingLayout">
      <div id="slideDeck" className="bg-light shadow p-3">
        {slides &&
          slides.map((s, i) => (
            <Slide
              slide={s}
              i={i}
              key={i}
              onClick={() => drawSlide(i)}
              onLoad={() => setNumSlidesLoaded((prevNum) => prevNum + 1)}
            />
          ))}
      </div>
      <div id="recordWindow" className="px-4 py-3">
        <h2>
          {data && data.presentationTitle} /{" "}
          <small className="text-muted">
            by {data && data.presenterFirstName}{" "}
            {data && data.presenterLastName}
          </small>
        </h2>
        <hr />
        {numSlidesLoaded !== data?.numSlides ? (
          <>
            <Loading />
            <div className="text-center">
              <h3>Loading Slide Deck...</h3>
              <h4>
                ({numSlidesLoaded} of {data?.numSlides} slides)
              </h4>
            </div>
          </>
        ) : null}
        {!isReady && numSlidesLoaded == data?.numSlides && frameLoaded ? (
          <div className="d-flex justify-content-center p-5">
            <div>
              <h3>Grant Access to Media Devices</h3>
              <p className="lead">
                In order to use this application we need to access your video
                and audio devices. After clicking the start button below you may
                be prompted to grant permission. Please click on "allow" if
                prompted.
              </p>
              <Button color="primary" onClick={() => setIsReady(true)}>
                Start
              </Button>
            </div>
          </div>
        ) : null}
        {isReady ? (
          <>
            <canvas ref={monitorRef} height="1080" width="1920"></canvas>
            <div className="d-flex justify-content-center">
              <Button outline color="secondary" onClick={prevSlide}>
                <FontAwesomeIcon icon="angle-left" /> Prev. Slide
              </Button>
              <ButtonGroup className="mx-3">
                <Button
                  color="danger"
                  // onClick={startRecording}
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
                  // onClick={recorder.stop}
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
        ) : null}
      </div>
    </div>
  );
};

export default Record;
