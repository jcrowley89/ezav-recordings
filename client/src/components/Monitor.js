import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useUserMedia } from "../utils/useUserMedia";

import frame from "../temp/frame2.png";

const Monitor = ({ presCanvasRef, ref }) => {
  const [videoWidth, setVideoWidth] = useState();
  const [videoHeight, setVideoHeight] = useState();
  const videoRef = useRef(document.createElement("video"));
  const frameRef = useRef(document.createElement("img"));
  frameRef.current.src = frame;

  const scale = 94;

  const mediaOpts = {
    audio: true,
    video: true,
  };
  const mediaStream = useUserMedia(mediaOpts);

  useEffect(() => {
    function update() {
      const video = videoRef.current;
      const canvas = ref.current;
      const presCanvas = presCanvasRef.current;
      const videoCtx = canvas.getContext("2d");
      videoCtx.clearRect(1547, 297, 357, 355);
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
      videoCtx.drawImage(frameRef.current, 0, 0);
      requestAnimationFrame(update);
    }
    function handleCanPlay() {
      const video = videoRef.current;
      video.play();
      setVideoHeight(video.srcObject.getVideoTracks()[0].getSettings().height);
      setVideoWidth(video.srcObject.getVideoTracks()[0].getSettings().width);
      update();
    }
    const video = videoRef.current;
    video.oncanplay = handleCanPlay;
    video.muted = true;
  }, [presCanvasRef, ref, videoHeight, videoWidth]);

  return <canvas ref={ref} height="1080" width="1920"></canvas>;
};

export default forwardRef(Monitor);
