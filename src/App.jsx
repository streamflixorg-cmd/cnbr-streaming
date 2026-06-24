import "./App.css"

import { useState } from "react"

import {
  Search,
  Home,
  Menu,
  Play,
  Shield,
  X
} from "lucide-react"

export default function App(){

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

  const [selectedSeason,setSelectedSeason] =
  useState(0)

  const [contents] =
  useState([

    {
      id:1,

      type:"series",

      title:"Arcane",

      description:
      "Duas irmãs entram em lados opostos em uma guerra entre tecnologia e magia.",

      cover:
      "https://images.alphacoders.com/118/1181423.jpg",

      banner:
      "https://wallpapercave.com/wp/wp9429848.jpg",

      seasons:[

        {
          number:1,

          episodes:[

            {
              number:1,

              title:"Bem-vindo",

              description:
              "O começo da história.",

              thumb:
              "https://images6.alphacoders.com/118/1181426.jpg",

              video:
              "https://www.youtube.com/embed/fXmAurh012s"
            }

          ]
        }

      ]
    },

    {
      id:2,

      type:"movie",

      title:"Interestelar",

      description:
      "Uma viagem espacial para salvar a humanidade.",

      cover:
      "https://wallpapercave.com/wp/wp1817978.jpg",

      banner:
      "https://wallpapercave.com/wp/wp1817967.jpg"
    }

  ])

  const [selectedContent,
  setSelectedContent] =
  useState(null)

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
              Painel Administrativo
            </h2>

            <p>
              Sistema funcionando.
            </p>

          </div>

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

      {/* CONTEUDO */}

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

          {/* SERIES */}

          {selectedContent.type ===
          "series" && (

            <>

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

            </>

          )}

        </div>

      )}

    </div>

  )

}