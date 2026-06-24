import "./App.css"

import { useState } from "react"

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

  const [selectedContent,
  setSelectedContent] =
  useState(null)

  const [contents,setContents] =
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
    }

  ])

  const [newContent,setNewContent] =
  useState({

    type:"series",

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

  function addContent(){

    if(!newContent.title){

      alert("Digite um título")
      return

    }

    setContents([

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

    ])

    setNewContent({

      type:"series",

      title:"",
      description:"",
      cover:"",
      banner:""

    })

  }

  function addEpisode(
    contentIndex,
    seasonIndex
  ){

    const updated =
    [...contents]

    updated[
      contentIndex
    ]
    .seasons[
      seasonIndex
    ]
    .episodes.push({

      number:
      updated[
        contentIndex
      ]
      .seasons[
        seasonIndex
      ]
      .episodes.length + 1,

      title:"Novo episódio",

      description:"Descrição",

      thumb:"",
      video:""

    })

    setContents(updated)

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

        </div>

      )}

    </div>

  )

}