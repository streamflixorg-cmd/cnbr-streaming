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
  doc,
  updateDoc
} from "firebase/firestore"

export default function App(){

  const [contents,setContents] =
  useState([])

  useEffect(()=>{

    const unsubscribe =
    onSnapshot(

      collection(db,"contents"),

      (snapshot)=>{

        const data =
        snapshot.docs.map(doc=>({

          firebaseId:doc.id,

          ...doc.data()

        }))

        setContents(data)

      }

    )

    return ()=>unsubscribe()

  },[])

  const [menuOpen,setMenuOpen] =
  useState(false)

  const [adminOpen,setAdminOpen] =
  useState(false)

  const [logged,setLogged] =
  useState(false)

  const [username,setUsername] =
  useState("")

  const [password,setPassword] =
  useState("")

  const [selectedContent,setSelectedContent] =
  useState(null)

  const [selectedSeason,setSelectedSeason] =
  useState(0)

  const [playerOpen,setPlayerOpen] =
  useState(false)

  const [currentVideo,setCurrentVideo] =
  useState("")

  const [newSeries,setNewSeries] =
  useState({

    title:"",
    description:"",
    cover:"",
    banner:""

  })

  function loginAdmin(){

    if(
      username === "marco" &&
      password === "22510827"
    ){

      setLogged(true)

    }else{

      alert("Login inválido")

    }

  }

  function formatVideo(url){

    if(!url) return ""

    if(
      url.includes("youtube.com/watch?v=")
    ){

      const id =
      url.split("v=")[1]

      return `https://www.youtube.com/embed/${id}`

    }

    if(
      url.includes("youtu.be/")
    ){

      const id =
      url.split("youtu.be/")[1]

      return `https://www.youtube.com/embed/${id}`

    }

    if(
      url.includes("drive.google.com")
    ){

      const match =
      url.match(/\/d\/(.*?)\//)

      if(match){

        return `https://drive.google.com/file/d/${match[1]}/preview`

      }

    }

    return url

  }

  async function addSeries(){

    if(!newSeries.title){

      alert("Digite um título")
      return

    }

    await addDoc(

      collection(db,"contents"),

      {

        id:Date.now(),

        type:"series",

        title:newSeries.title,

        description:
        newSeries.description,

        cover:newSeries.cover,

        banner:newSeries.banner,

        seasons:[
          {
            number:1,
            episodes:[]
          }
        ]

      }

    )

    setNewSeries({

      title:"",
      description:"",
      cover:"",
      banner:""

    })

  }

  async function saveSeries(content){

    await updateDoc(

      doc(
        db,
        "contents",
        content.firebaseId
      ),

      {

        title:content.title,

        description:
        content.description,

        cover:content.cover,

        banner:content.banner,

        seasons:content.seasons

      }

    )

  }

  async function deleteSeries(content){

    await deleteDoc(

      doc(
        db,
        "contents",
        content.firebaseId
      )

    )

  }

  async function addSeason(content){

    const updatedSeasons =
    [
      ...content.seasons,

      {
        number:
        content.seasons.length + 1,

        episodes:[]
      }
    ]

    await updateDoc(

      doc(
        db,
        "contents",
        content.firebaseId
      ),

      {
        seasons:updatedSeasons
      }

    )

  }

  async function addEpisode(
    content,
    seasonIndex
  ){

    const updatedSeasons =
    [...content.seasons]

    updatedSeasons[
      seasonIndex
    ]
    .episodes.push({

      number:
      updatedSeasons[
        seasonIndex
      ]
      .episodes.length + 1,

      title:"Novo episódio",

      description:"Descrição",

      thumb:"",

      video:""

    })

    await updateDoc(

      doc(
        db,
        "contents",
        content.firebaseId
      ),

      {
        seasons:updatedSeasons
      }

    )

  }

  function updateEpisode(
    contentIndex,
    seasonIndex,
    epIndex,
    field,
    value
  ){

    const updated =
    [...contents]

    updated[
      contentIndex
    ]
    .seasons[
      seasonIndex
    ]
    .episodes[
      epIndex
    ][field] = value

    setContents(updated)

  }

  async function saveEpisodes(content){

    await updateDoc(

      doc(
        db,
        "contents",
        content.firebaseId
      ),

      {
        seasons:content.seasons
      }

    )

  }

  async function deleteEpisode(
    content,
    seasonIndex,
    epIndex
  ){

    const updatedSeasons =
    [...content.seasons]

    updatedSeasons[
      seasonIndex
    ]
    .episodes.splice(
      epIndex,
      1
    )

    await updateDoc(

      doc(
        db,
        "contents",
        content.firebaseId
      ),

      {
        seasons:updatedSeasons
      }

    )

  }

  return(

    <div className="app">

      <div className="navbar">

        <div
          className="logo"

          onClick={()=>{
            setSelectedContent(null)
            setAdminOpen(false)
          }}
        >

          Stream<span>Flixx</span>

        </div>

        <div className="navActions">

          <div className="searchBar">

            <Search size={18}/>

            <input
              placeholder="Pesquisar..."
            />

          </div>

          <div className="icons">

            <Home
              onClick={()=>{
                setSelectedContent(null)
                setAdminOpen(false)
              }}
            />

            <Heart/>

            <Menu
              onClick={()=>
                setMenuOpen(!menuOpen)
              }
            />

          </div>

        </div>

        {menuOpen && (

          <div className="menuDropdown">

            <button

              onClick={()=>{

                setAdminOpen(true)

                setMenuOpen(false)

              }}
            >

              <Shield size={18}/>
              Painel Admin

            </button>

          </div>

        )}

      </div>

      {playerOpen && (

        <div className="playerModal">

          <div className="playerBox">

            <div className="playerHeader">

              <h2>
                Assistindo
              </h2>

              <X
                className="close"

                onClick={()=>
                  setPlayerOpen(false)
                }
              />

            </div>

            <div className="videoContainer">

              <iframe
                src={currentVideo}
                allowFullScreen
              />

            </div>

          </div>

        </div>

      )}

      {adminOpen &&
      !logged && (

        <div className="loginScreen">

          <div className="loginBox">

            <h1>
              Painel Admin
            </h1>

            <input
              placeholder="Usuário"

              value={username}

              onChange={(e)=>
                setUsername(e.target.value)
              }
            />

            <input
              type="password"

              placeholder="Senha"

              value={password}

              onChange={(e)=>
                setPassword(e.target.value)
              }
            />

            <button
              onClick={loginAdmin}
            >
              Entrar
            </button>

          </div>

        </div>

      )}

      {adminOpen &&
      logged && (

        <div className="adminPanel">

          <div className="contentEditor">

            <h2>
              Nova Série
            </h2>

            <input
              placeholder="Título"

              value={newSeries.title}

              onChange={(e)=>
                setNewSeries({

                  ...newSeries,

                  title:e.target.value

                })
              }
            />

            <textarea
              placeholder="Descrição"

              value={
                newSeries.description
              }

              onChange={(e)=>
                setNewSeries({

                  ...newSeries,

                  description:
                  e.target.value

                })
              }
            />

            <input
              placeholder="Capa"

              value={newSeries.cover}

              onChange={(e)=>
                setNewSeries({

                  ...newSeries,

                  cover:e.target.value

                })
              }
            />

            <input
              placeholder="Banner"

              value={newSeries.banner}

              onChange={(e)=>
                setNewSeries({

                  ...newSeries,

                  banner:e.target.value

                })
              }
            />

            <button
              className="watchEpisode"

              onClick={addSeries}
            >

              <Plus size={16}/>
              Adicionar Série

            </button>

          </div>

          {contents.map(
            (content,contentIndex)=>(

            <div
              className="contentEditor"

              key={content.id}
            >

              <input

                value={content.title}

                onChange={(e)=>{

                  const updated =
                  [...contents]

                  updated[
                    contentIndex
                  ]
                  .title =
                  e.target.value

                  setContents(updated)

                }}
              />

              <textarea

                value={
                  content.description
                }

                onChange={(e)=>{

                  const updated =
                  [...contents]

                  updated[
                    contentIndex
                  ]
                  .description =
                  e.target.value

                  setContents(updated)

                }}
              />

              <input

                value={content.cover}

                onChange={(e)=>{

                  const updated =
                  [...contents]

                  updated[
                    contentIndex
                  ]
                  .cover =
                  e.target.value

                  setContents(updated)

                }}
              />

              <input

                value={content.banner}

                onChange={(e)=>{

                  const updated =
                  [...contents]

                  updated[
                    contentIndex
                  ]
                  .banner =
                  e.target.value

                  setContents(updated)

                }}
              />

              <div
                style={{
                  display:"flex",
                  gap:"10px",
                  marginBottom:"20px"
                }}
              >

                <button
                  className="watchEpisode"

                  onClick={()=>
                    saveSeries(content)
                  }
                >

                  Salvar

                </button>

                <button
                  className="watchEpisode"

                  style={{
                    background:"#ff3d3d"
                  }}

                  onClick={()=>
                    deleteSeries(content)
                  }
                >

                  <Trash2 size={16}/>
                  Excluir

                </button>

              </div>

              {content.seasons.map(
                (season,seasonIndex)=>(

                <div key={seasonIndex}>

                  <h3>
                    Temporada {
                      season.number
                    }
                  </h3>

                  <button
                    className="watchEpisode"

                    onClick={()=>{

                      addEpisode(
                        content,
                        seasonIndex
                      )

                    }}
                  >

                    + Episódio

                  </button>

                  {season.episodes.map(
                    (ep,epIndex)=>(

                    <div
                      className="episodeEditor"

                      key={epIndex}
                    >

                      <input

                        value={ep.title}

                        onChange={(e)=>

                          updateEpisode(

                            contentIndex,
                            seasonIndex,
                            epIndex,

                            "title",

                            e.target.value

                          )

                        }
                      />

                      <textarea

                        value={
                          ep.description
                        }

                        onChange={(e)=>

                          updateEpisode(

                            contentIndex,
                            seasonIndex,
                            epIndex,

                            "description",

                            e.target.value

                          )

                        }
                      />

                      <input

                        placeholder="Thumb"

                        value={ep.thumb}

                        onChange={(e)=>

                          updateEpisode(

                            contentIndex,
                            seasonIndex,
                            epIndex,

                            "thumb",

                            e.target.value

                          )

                        }
                      />

                      <input

                        placeholder="Vídeo"

                        value={ep.video}

                        onChange={(e)=>

                          updateEpisode(

                            contentIndex,
                            seasonIndex,
                            epIndex,

                            "video",

                            formatVideo(
                              e.target.value
                            )

                          )

                        }
                      />

                      <div
                        style={{
                          display:"flex",
                          gap:"10px"
                        }}
                      >

                        <button
                          className="watchEpisode"

                          onClick={()=>
                            saveEpisodes(
                              content
                            )
                          }
                        >

                          Salvar Episódio

                        </button>

                        <button
                          className="watchEpisode"

                          style={{
                            background:"#ff3d3d"
                          }}

                          onClick={()=>{

                            deleteEpisode(
                              content,
                              seasonIndex,
                              epIndex
                            )

                          }}
                        >

                          Excluir

                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              ))}

              <button
                className="watchEpisode"

                onClick={()=>
                  addSeason(content)
                }
              >

                Nova Temporada

              </button>

            </div>

          ))}

        </div>

      )}

      {!selectedContent &&
      !adminOpen && (

        <div className="home">

          <div className="cardsGrid">

            {contents.map(item=>(

              <div
                className="movieCard"
                key={item.id}
              >

                <div className="moviePoster">

                  <img
                    src={item.cover}
                    alt=""
                  />

                  <div className="movieLayer">

                    <button
                      onClick={()=>
                        setSelectedContent(item)
                      }
                    >

                      <Play fill="white"/>

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

      {selectedContent &&
      !adminOpen && (

        <div className="seriesPage">

          <div className="seriesBanner">

            <img
              src={
                selectedContent.banner
              }
              alt=""
            />

            <div className="seriesOverlay"/>

            <div className="seriesInfo">

              <h1>
                {
                  selectedContent.title
                }
              </h1>

              <p>
                {
                  selectedContent
                  .description
                }
              </p>

            </div>

          </div>

          <div className="seasonTabs">

            {selectedContent
            .seasons.map(
              (season,index)=>(

              <button

                key={index}

                className={
                  selectedSeason ===
                  index
                  ? "seasonTab active"
                  : "seasonTab"
                }

                onClick={()=>
                  setSelectedSeason(index)
                }
              >

                Temporada {
                  season.number
                }

              </button>

            ))}

          </div>

          <div className="episodesGrid">

            {selectedContent
            .seasons[
              selectedSeason
            ]
            ?.episodes
            ?.map((ep,epIndex)=>(

              <div
                className="episodeCard"
                key={epIndex}
              >

                <div className="episodeThumb">

                  <img
                    src={ep.thumb}
                    alt=""
                  />

                </div>

                <div className="episodeContent">

                  <h3>
                    {ep.title}
                  </h3>

                  <p>
                    {ep.description}
                  </p>

                  <button
                    className="watchEpisode"

                    onClick={()=>{

                      setCurrentVideo(
                        ep.video
                      )

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

    </div>

  )

}