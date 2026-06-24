import "./App.css"

import {
  useState,
  useEffect
} from "react"

import {
  Search,
  Home,
  Menu,
  Play,
  Shield,
  X,
  Plus,
  Trash2
} from "lucide-react"

import { db }
from "./firebase"

import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore"

export default function App(){

  /* =========================
     STATES
  ========================= */

  const [contents,setContents] =
  useState([])

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

  const [playerOpen,setPlayerOpen] =
  useState(false)

  const [currentVideo,setCurrentVideo] =
  useState("")

  const [selectedContent,
  setSelectedContent] =
  useState(null)

  const [selectedSeason,
  setSelectedSeason] =
  useState(0)

  const [newContent,setNewContent] =
  useState({

    type:"series",

    title:"",
    description:"",
    cover:"",
    banner:""

  })

  /* =========================
     GOOGLE DRIVE FIX
  ========================= */

  function formatDriveLink(url){

    if(!url) return ""

    if(
      url.includes(
        "drive.google.com"
      )
    ){

      const match =
      url.match(/\/d\/(.*?)\//)

      if(match){

        return `https://drive.google.com/file/d/${match[1]}/preview`

      }

    }

    return url

  }

  /* =========================
     FIREBASE LOAD
  ========================= */

  useEffect(()=>{

    async function loadData(){

      try{

        const ref =
        doc(
          db,
          "streamflix",
          "data"
        )

        const snap =
        await getDoc(ref)

        if(snap.exists()){

          const firebaseData =
          snap.data()

          if(firebaseData.contents){

            let loaded =
            firebaseData.contents

            if(
              !Array.isArray(
                loaded
              )
            ){

              loaded =
              Object.values(
                loaded
              )

            }

            loaded =
            loaded.map(item=>({

              id:
              item.id ||
              Date.now(),

              type:
              item.type ||
              "movie",

              title:
              item.title ||
              "",

              description:
              item.description ||
              "",

              cover:
              item.cover ||
              "",

              banner:
              item.banner ||
              "",

              seasons:
              item.seasons || []

            }))

            setContents(loaded)

          }

        }

      }catch(err){

        console.log(err)

      }

    }

    loadData()

  },[])

  /* =========================
     FIREBASE SAVE
  ========================= */

  async function saveData(data){

    try{

      await setDoc(

        doc(
          db,
          "streamflix",
          "data"
        ),

        {
          contents:data
        }

      )

    }catch(err){

      console.log(err)

    }

  }

  /* =========================
     LOGIN
  ========================= */

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

  /* =========================
     ADD CONTENT
  ========================= */

  function addContent(){

    const updated = [

      ...contents,

      {

        id:Date.now(),

        type:newContent.type,

        title:newContent.title,

        description:
        newContent.description,

        cover:newContent.cover,

        banner:newContent.banner,

        seasons:
        newContent.type ===
        "series"

        ? [
          {
            number:1,
            episodes:[]
          }
        ]

        : []

      }

    ]

    setContents(updated)

    saveData(updated)

  }

  /* =========================
     ADD SEASON
  ========================= */

  function addSeason(contentId){

    const updated =
    [...contents]

    const content =
    updated.find(
      item=>item.id===contentId
    )

    content.seasons.push({

      number:
      content.seasons.length + 1,

      episodes:[]

    })

    setContents(updated)

    saveData(updated)

  }

  /* =========================
     ADD EP
  ========================= */

  function addEpisode(
    contentId,
    seasonIndex
  ){

    const updated =
    [...contents]

    const content =
    updated.find(
      item=>item.id===contentId
    )

    content
    .seasons[
      seasonIndex
    ]
    .episodes.push({

      number:
      content
      .seasons[
        seasonIndex
      ]
      .episodes.length + 1,

      title:"Novo episódio",

      description:"",

      thumb:"",

      video:""

    })

    setContents(updated)

    saveData(updated)

  }

  /* =========================
     DELETE CONTENT
  ========================= */

  function deleteContent(id){

    const updated =
    contents.filter(
      item=>item.id!==id
    )

    setContents(updated)

    saveData(updated)

  }

  return(

    <div className="app">

      {/* NAVBAR */}

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

      {/* PLAYER */}

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

      {/* LOGIN */}

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

      {/* ADMIN */}

      {adminOpen &&
      logged && (

        <div className="adminPanel">

          <div className="contentEditor">

            <h2>
              Novo Conteúdo
            </h2>

            <select

              value={newContent.type}

              onChange={(e)=>
                setNewContent({

                  ...newContent,

                  type:e.target.value

                })
              }
            >

              <option value="series">
                Série
              </option>

              <option value="movie">
                Filme
              </option>

            </select>

            <input
              placeholder="Título"

              value={newContent.title}

              onChange={(e)=>
                setNewContent({

                  ...newContent,

                  title:e.target.value

                })
              }
            />

            <textarea
              placeholder="Descrição"

              value={
                newContent.description
              }

              onChange={(e)=>
                setNewContent({

                  ...newContent,

                  description:
                  e.target.value

                })
              }
            />

            <input
              placeholder="Capa"

              value={newContent.cover}

              onChange={(e)=>
                setNewContent({

                  ...newContent,

                  cover:e.target.value

                })
              }
            />

            <input
              placeholder="Banner"

              value={newContent.banner}

              onChange={(e)=>
                setNewContent({

                  ...newContent,

                  banner:e.target.value

                })
              }
            />

            <button
              className="watchEpisode"

              onClick={addContent}
            >

              <Plus size={16}/>
              Adicionar

            </button>

          </div>

          {contents.map(
            (
              content,
              contentIndex
            )=>(

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

                  saveData(updated)

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

                  saveData(updated)

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

                  saveData(updated)

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

                  saveData(updated)

                }}
              />

              <button
                className="deleteBtn"

                onClick={()=>
                  deleteContent(
                    content.id
                  )
                }
              >

                <Trash2 size={16}/>
                Excluir

              </button>

              {/* SERIES */}

              {content.type ===
              "series" && (

                <>

                  {content.seasons.map(
                    (
                      season,
                      seasonIndex
                    )=>(

                    <div
                      key={seasonIndex}
                    >

                      <h3>

                        Temporada {
                          season.number
                        }

                      </h3>

                      {season.episodes.map(
                        (
                          ep,
                          epIndex
                        )=>(

                        <div
                          key={epIndex}
                          className="episodeAdmin"
                        >

                          <input

                            value={ep.title}

                            placeholder="Título"

                            onChange={(e)=>{

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
                              ]
                              .title =
                              e.target.value

                              setContents(updated)

                              saveData(updated)

                            }}
                          />

                          <textarea

                            value={
                              ep.description
                            }

                            placeholder="Descrição"

                            onChange={(e)=>{

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
                              ]
                              .description =
                              e.target.value

                              setContents(updated)

                              saveData(updated)

                            }}
                          />

                          <input

                            value={ep.thumb}

                            placeholder="Thumb"

                            onChange={(e)=>{

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
                              ]
                              .thumb =
                              e.target.value

                              setContents(updated)

                              saveData(updated)

                            }}
                          />

                          <input

                            value={ep.video}

                            placeholder="Vídeo"

                            onChange={(e)=>{

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
                              ]
                              .video =
                              formatDriveLink(
                                e.target.value
                              )

                              setContents(updated)

                              saveData(updated)

                            }}
                          />

                        </div>

                      ))}

                      <button
                        className="watchEpisode"

                        onClick={()=>{

                          addEpisode(
                            content.id,
                            seasonIndex
                          )

                        }}
                      >

                        <Plus size={16}/>
                        Episódio

                      </button>

                    </div>

                  ))}

                  <button
                    className="watchEpisode"

                    onClick={()=>
                      addSeason(
                        content.id
                      )
                    }
                  >

                    <Plus size={16}/>
                    Temporada

                  </button>

                </>

              )}

            </div>

          ))}

        </div>

      )}

      {/* HOME */}

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

                      onClick={()=>{
                        setSelectedContent(item)
                      }}
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

      {/* CONTENT PAGE */}

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

          {selectedContent.type ===
          "series" && (

            <>

              <div className="seasonTabs">

                {selectedContent
                .seasons.map(
                  (
                    season,
                    index
                  )=>(

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

                    <img
                      src={ep.thumb}
                      alt=""
                    />

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

                ))}

              </div>

            </>

          )}

        </div>

      )}

    </div>

  )

}