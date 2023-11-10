import React, { useRef, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";
import * as styles from "./Posenet.styles";

import { usePosenetContext } from "../../store/PosenetContext";

const PoseNet = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const streamSize = 200;

  const { updatePosenetValues } = usePosenetContext();

  useEffect(() => {
    const setupCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          //  video width and height must be defined!
          videoRef.current.width = streamSize;
          videoRef.current.height = streamSize;
        }
      }
    };

    const detectPose = async () => {
      const net = await posenet.load();

      setInterval(async () => {
        if (videoRef.current) {
          const pose = await net.estimateSinglePose(videoRef.current);

          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            canvasRef.current.width = videoRef.current.width;
            canvasRef.current.height = videoRef.current.height;

            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            ctx.drawImage(
              videoRef.current,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );

            drawPose(pose.keypoints, ctx);

            // Update posenet context
            updatePosenetValues({
              leftHand: {
                x: pose.keypoints[9].position.x,
                y: pose.keypoints[9].position.y,
              },
              rightHand: {
                x: pose.keypoints[10].position.x,
                y: pose.keypoints[10].position.y,
              },
            });

            // Log keypoints' values
            // pose.keypoints.forEach((keypoint) => {
            //   console.log(
            //     `${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`
            //   );
            // });
          }
        }
      }, 60); // Adjust the interval for your desired frame rate
    };

    const drawPose = (keypoints, ctx) => {
      keypoints.forEach((keypoint) => {
        const { x, y } = keypoint.position;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
      });

      keypoints.forEach((keypoint) => {
        if (keypoint.part !== "nose") {
          const { x, y } = keypoint.position;
          ctx.beginPath();
          ctx.moveTo(keypoints[0].position.x, keypoints[0].position.y);
          ctx.lineTo(x, y);
          ctx.strokeStyle = "#00FF00";
          ctx.stroke();
        }
      });
    };

    setupCamera();
    detectPose();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.posenetContainer}>
        <video style={styles.video} ref={videoRef} autoPlay muted />
        <canvas style={styles.canvas} ref={canvasRef} />
      </div>
    </div>
  );
};

export default PoseNet;
