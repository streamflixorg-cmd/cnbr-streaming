import "./App.css"

import { useState, useEffect } from "react"

import {
  Search,
  Heart,
  Home,
  Menu,
  Play,
  Shield,
  X,
  Plus,
  Trash2
} from "lucide-react"

import { db } from "./firebase"

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore"

export default function App() {

  const [contents, setContents] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "contents"),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          firebaseId: doc.id,
          ...doc.data()
        }))
        setContents(data)
      }
    )

    return () => unsubscribe()
  }, [])

  const [menuOpen, setMenuOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [logged, setLogged] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [selectedContent, setSelectedContent] = useState(null)
  const [selectedSeason, setSelectedSeason] = useState(0)

  const [playerOpen, setPlayerOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState("")

  const [newSeries, setNewSeries] = useState({
    title: "",
    description: "",
    cover: "",
    banner: ""
  })

  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    cover: "",
    banner: "",
    video: ""
  })

  function loginAdmin() {
    if (username === "marco" && password === "22510827") {
      setLogged(true)
    } else {
      alert("Login inválido")
    }
  }

  function formatVideo(url) {
    if (!url) return ""

    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1]
      return `https://www.youtube.com/embed/${id}`
    }

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]
      return `https://www.youtube.com/embed/${id}`
    }

    if (url.includes("drive.google.com")) {
      const match = url.match(/\/d\/(.*?)\//)
      if (match) {
        return `https://drive.google.com/file/d/${match[1]}/preview`
      }
    }

    return url
  }

  async function addSeries() {
    if (!newSeries.title) return alert("Digite um título")

    await addDoc(collection(db, "contents"), {
      id: Date.now(),
      type: "series",
      title: newSeries.title,
      description: newSeries.description,
      cover: newSeries.cover,
      banner: newSeries.banner,
      seasons: [
        {
          number: 1,
          episodes: []
        }
      ]
    })

    setNewSeries({ title: "", description: "", cover: "", banner: "" })
  }

  async function addMovie() {
    if (!newMovie.title) return alert("Digite um título")

    await addDoc(collection(db, "contents"), {
      id: Date.now(),
      type: "movie",
      title: newMovie.title,
      description: newMovie.description,
      cover: newMovie.cover,
      banner: newMovie.banner,
      video: formatVideo(newMovie.video)
    })

    setNewMovie({
      title: "",
      description: "",
      cover: "",
      banner: "",
      video: ""
    })
  }

  async function deleteItem(item) {
    await deleteDoc(doc(db, "contents", item.firebaseId))
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <div className="navbar">

        <div className="logo" onClick={() => setSelectedContent(null)}>
          Stream<span>Flixx</span>
        </div>

        <div className="navActions">
          <div className="icons">
            <Home onClick={() => setSelectedContent(null)} />
            <Menu onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>

        {menuOpen && (
          <div className="menuDropdown">
            <button onClick={() => { setAdminOpen(true); setMenuOpen(false) }}>
              <Shield size={18} />
              Admin
            </button>
          </div>
        )}

      </div>

      {/* LOGIN */}
      {adminOpen && !logged && (
        <div className="loginScreen">
          <div className="loginBox">

            <h1>Admin</h1>

            <input
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={loginAdmin}>
              Entrar
            </button>

          </div>
        </div>
      )}

      {/* ADMIN */}
      {adminOpen && logged && (
        <div className="adminPanel">

          {/* SERIES */}
          <div className="contentEditor">
            <h2>Nova Série</h2>

            <input placeholder="Título"
              value={newSeries.title}
              onChange={(e) => setNewSeries({ ...newSeries, title: e.target.value })}
            />

            <textarea placeholder="Descrição"
              value={newSeries.description}
              onChange={(e) => setNewSeries({ ...newSeries, description: e.target.value })}
            />

            <input placeholder="Capa"
              value={newSeries.cover}
              onChange={(e) => setNewSeries({ ...newSeries, cover: e.target.value })}
            />

            <input placeholder="Banner"
              value={newSeries.banner}
              onChange={(e) => setNewSeries({ ...newSeries, banner: e.target.value })}
            />

            <button className="watchEpisode" onClick={addSeries}>
              <Plus size={16} /> Adicionar Série
            </button>
          </div>

          {/* MOVIES */}
          <div className="contentEditor">
            <h2>Novo Filme</h2>

            <input placeholder="Título"
              value={newMovie.title}
              onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            />

            <textarea placeholder="Descrição"
              value={newMovie.description}
              onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
            />

            <input placeholder="Capa"
              value={newMovie.cover}
              onChange={(e) => setNewMovie({ ...newMovie, cover: e.target.value })}
            />

            <input placeholder="Banner"
              value={newMovie.banner}
              onChange={(e) => setNewMovie({ ...newMovie, banner: e.target.value })}
            />

            <input placeholder="Vídeo"
              value={newMovie.video}
              onChange={(e) => setNewMovie({ ...newMovie, video: e.target.value })}
            />

            <button className="watchEpisode" onClick={addMovie}>
              <Plus size={16} /> Adicionar Filme
            </button>
          </div>

          {/* LISTA */}
          {contents.map((item) => (
            <div className="contentEditor" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.type}</p>

              <button
                className="watchEpisode"
                style={{ background: "#ff3d3d" }}
                onClick={() => deleteItem(item)}
              >
                <Trash2 size={16} /> Excluir
              </button>
            </div>
          ))}

        </div>
      )}

      {/* HOME */}
      {!selectedContent && !adminOpen && (
        <div className="home">

          <div className="cardsGrid">

            {contents.map(item => (
              <div className="movieCard" key={item.id}>
                <div className="moviePoster">

                  <img src={item.cover} alt="" />

                  <div className="movieLayer">
                    <button onClick={() => {
                      setSelectedContent(item)
                      setSelectedSeason(0)
                    }}>
                      <Play />
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>

        </div>
      )}

      {/* PLAYER FILME */}
      {selectedContent?.type === "movie" && (
        <div className="playerModal">
          <div className="playerBox">

            <div className="playerHeader">
              <h2>{selectedContent.title}</h2>
              <X className="close" onClick={() => setSelectedContent(null)} />
            </div>

            <div className="videoContainer">
              <iframe src={selectedContent.video} allowFullScreen />
            </div>

          </div>
        </div>
      )}

      {/* SÉRIE COMPLETA */}
      {selectedContent?.type === "series" && (
        <div className="seriesPage">

          <div className="seriesBanner">
            <img src={selectedContent.banner} alt="" />
            <div className="seriesOverlay" />

            <div className="seriesInfo">
              <h1>{selectedContent.title}</h1>
              <p>{selectedContent.description}</p>
            </div>
          </div>

          <div className="seasonTabs">
            {selectedContent.seasons.map((season, index) => (
              <button
                key={index}
                className={selectedSeason === index ? "seasonTab active" : "seasonTab"}
                onClick={() => setSelectedSeason(index)}
              >
                Temporada {season.number}
              </button>
            ))}
          </div>

          <div className="episodesGrid">

            {selectedContent.seasons[selectedSeason]?.episodes?.map((ep, i) => (
              <div className="episodeCard" key={i}>

                <div className="episodeThumb">
                  <img src={ep.thumb} alt="" />
                </div>

                <div className="episodeContent">
                  <h3>{ep.title}</h3>
                  <p>{ep.description}</p>

                  <button
                    className="watchEpisode"
                    onClick={() => {
                      setCurrentVideo(ep.video)
                      setPlayerOpen(true)
                    }}
                  >
                    Assistir
                  </button>
                </div>

              </div>
            ))}

          </div>

        </div>
      )}

      {/* PLAYER EPISÓDIO */}
      {playerOpen && (
        <div className="playerModal">
          <div className="playerBox">

            <div className="playerHeader">
              <h2>Episódio</h2>
              <X className="close" onClick={() => setPlayerOpen(false)} />
            </div>

            <div className="videoContainer">
              <iframe src={currentVideo} allowFullScreen />
            </div>

          </div>
        </div>
      )}

    </div>
  )
}