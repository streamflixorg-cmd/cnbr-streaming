import { useEffect, useState, useRef } from "react";

export default function Player() {
  const [video, setVideo] = useState("");
  const [type, setType] = useState("mp4");
  const [episodes] = useState([
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
  ]);
  const [current, setCurrent] = useState(0);

  const videoRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("video");

    if (v) {
      setVideo(v);

      if (v.includes("youtube.com") || v.includes("youtu.be")) {
        setType("youtube");
      } else if (v.includes("drive.google.com")) {
        setType("drive");
      } else {
        setType("mp4");
      }
    }
  }, []);

  function nextEpisode() {
    const next = current + 1;
    if (next < episodes.length) {
      setCurrent(next);
      setVideo(episodes[next]);
    }
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }

  function changeVolume(e) {
    const v = videoRef.current;
    if (v) v.volume = e.target.value;
  }

  function renderPlayer() {
    if (!video) {
      return <h2 style={{ color: "white" }}>Nenhum vídeo selecionado</h2>;
    }

    // YouTube
    if (type === "youtube") {
      let id = video.split("v=")[1] || video.split("/").pop();
      return (
        <iframe
          width="80%"
          height="450"
          src={`https://www.youtube.com/embed/${id}`}
          allowFullScreen
        />
      );
    }

    // Google Drive
    if (type === "drive") {
      let id = video.match(/[-\w]{25,}/);
      return (
        <iframe
          width="80%"
          height="450"
          src={`https://drive.google.com/file/d/${id}/preview`}
          allow="autoplay"
        />
      );
    }

    // MP4 / direto
    return (
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{ width: "80%", borderRadius: "10px" }}
      >
        <source src={video} type="video/mp4" />
      </video>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={{ color: "white" }}>Meu Player</h2>

      {renderPlayer()}

      <div style={styles.controls}>
        <button onClick={togglePlay}>Play / Pause</button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          onChange={changeVolume}
        />

        <button onClick={nextEpisode}>Próximo Episódio</button>

        <button onClick={() => (window.location.href = "/")}>
          Página Inicial
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "black",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    marginTop: 15,
    display: "flex",
    gap: 10,
  },
};