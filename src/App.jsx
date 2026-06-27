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

import { db } from "./firebase"

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
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

        const querySnapshot =
        await getDocs(

          collection(
            db,
            "contents"
          )

        )

        const data = []

        querySnapshot.forEach((docItem)=>{

          data.push({

            firebaseId:docItem.id,

            ...docItem.data()

          })

        })

        setContents(data)

      }catch(err){

        console.log(err)

      }

    }

    loadData()

  },[])

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
     UPDATE CONTENT
  ========================= */

  async function updateContent(
    firebaseId,
    updatedData
  ){

    try{

      await updateDoc(

        doc(
          db,
          "contents",
          firebaseId
        ),

        updatedData

      )

    }catch(err){

      console.log(err)

    }

  }

  /* =========================
     ADD CONTENT
  ========================= */

  async function addContent(){

    try{

      await addDoc(

        collection(
          db,
          "contents"
        ),

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

      )

      window.location.reload()

    }catch(err){

      console.log(err)

    }

  }

  /* =========================
     DELETE CONTENT
  ========================= */

  async function deleteContent(firebaseId){

    try{

      await deleteDoc(

        doc(
          db,
          "contents",
          firebaseId
        )

      )

      setContents(

        contents.filter(
          item=>
          item.firebaseId
          !== firebaseId
        )

      )

    }catch(err){

      console.log(err)

    }

  }

  /* =========================
     ADD SEASON
  ========================= */

  async function addSeason(content){

    const updatedSeasons = [

      ...(content.seasons || []),

      {

        number:
        (content.seasons?.length || 0) + 1,

        episodes:[]

      }

    ]

    await updateContent(

      content.firebaseId,

      {
        seasons:updatedSeasons
      }

    )

    window.location.reload()

  }

  /* =========================
     ADD EPISODE
  ========================= */

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

      description:"",

      thumb:"",

      video:""

    })

    await updateContent(

      content.firebaseId,

      {
        seasons:updatedSeasons
      }

    )

    window.location.reload()

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

              {/* =========
                 UNICA ALTERAÇÃO:
                 QUALIDADE
              ========= */}

              <iframe

                src={`${currentVideo}?quality=1080`}

                allow="
                autoplay;
                fullscreen;
                picture-in-picture"

                allowFullScreen

                style={{
                  width:"100%",
                  height:"100%",
                  border:"none",
                  background:"#000",

                  imageRendering:"auto",

                  backfaceVisibility:
                  "hidden",

                  transform:
                  "translateZ(0)",

                  WebkitTransform:
                  "translateZ(0)"
                }}

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

          {/* NOVO CONTEUDO */}

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

          {/* LISTA */}

          {contents.map((content)=>(

            <div
              className="contentEditor"
              key={content.firebaseId}
            >

              <details>

                <summary
                  className="adminSummary"
                >

                  <div>

                    <h2>
                      {content.title}
                    </h2>

                    <small>

                      {
                        content.type ===
                        "series"

                        ? "Série"

                        : "Filme"
                      }

                    </small>

                  </div>

                </summary>

                <div
                  className="editorContent"
                >

                  <input
                    value={content.title}

                    onChange={async(e)=>{

                      const updated =
                      e.target.value

                      const newArray =
                      contents.map(item=>

                        item.firebaseId ===
                        content.firebaseId

                        ? {
                          ...item,
                          title:updated
                        }

                        : item

                      )

                      setContents(newArray)

                      await updateContent(

                        content.firebaseId,

                        {
                          title:updated
                        }

                      )

                    }}
                  />

                  <textarea
                    value={
                      content.description
                    }

                    onChange={async(e)=>{

                      const updated =
                      e.target.value

                      const newArray =
                      contents.map(item=>

                        item.firebaseId ===
                        content.firebaseId

                        ? {
                          ...item,
                          description:updated
                        }

                        : item

                      )

                      setContents(newArray)

                      await updateContent(

                        content.firebaseId,

                        {
                          description:
                          updated
                        }

                      )

                    }}
                  />

                  <input
                    value={content.cover}

                    onChange={async(e)=>{

                      const updated =
                      e.target.value

                      const newArray =
                      contents.map(item=>

                        item.firebaseId ===
                        content.firebaseId

                        ? {
                          ...item,
                          cover:updated
                        }

                        : item

                      )

                      setContents(newArray)

                      await updateContent(

                        content.firebaseId,

                        {
                          cover:updated
                        }

                      )

                    }}
                  />

                  <input
                    value={content.banner}

                    onChange={async(e)=>{

                      const updated =
                      e.target.value

                      const newArray =
                      contents.map(item=>

                        item.firebaseId ===
                        content.firebaseId

                        ? {
                          ...item,
                          banner:updated
                        }

                        : item

                      )

                      setContents(newArray)

                      await updateContent(

                        content.firebaseId,

                        {
                          banner:updated
                        }

                      )

                    }}
                  />

                  <button
                    className="deleteBtn"

                    onClick={()=>
                      deleteContent(
                        content.firebaseId
                      )
                    }
                  >

                    <Trash2 size={16}/>
                    Excluir

                  </button>

                </div>

              </details>

            </div>

          ))}

        </div>

      )}

    </div>

  )

}