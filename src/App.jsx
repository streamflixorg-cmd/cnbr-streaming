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
     DRIVE FIX
  ========================= */

  function formatDriveLink(url){

    if(!url) return ""

    if(
      url.includes("/preview")
    ){

      return url

    }

    if(
      url.includes(
        "drive.google.com"
      )
    ){

      const match =
      url.match(/\/d\/([^/]+)/)

      if(match && match[1]){

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
          "contents",
          "main"
        )

        const snap =
        await getDoc(ref)

        if(snap.exists()){

          const firebaseData =
          snap.data()

          if(firebaseData.contents){

            const loaded =
            Array.isArray(
              firebaseData.contents
            )

            ? firebaseData.contents

            : Object.values(
              firebaseData.contents
            )

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
          "contents",
          "main"
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
     ADD EPISODE
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

            </div>

          ))}

        </div>

      )}

    </div>

  )

}