import React, { useEffect, useRef } from "react";

export default function Player({
  open,
  title,
  video,
  onClose,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="player-overlay">
      <div className="player-container">
        <div className="player-header">
          <h2>{title}</h2>

          <button
            className="player-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <video
          ref={videoRef}
          className="player-video"
          controls
          autoPlay
          playsInline
          preload="metadata"
        >
          <source src={video} type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
      </div>
    </div>
  );
}