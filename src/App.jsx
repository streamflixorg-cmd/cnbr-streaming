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
  useState([])

  const [newContent,setNewContent] =
  useState({

    type:"series",

    title:"",
    description:"",
    cover:"",
    banner:""

  })

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

        if(
          snap.exists() &&
          snap.data().contents
        ){

          setContents(
            snap.data().contents
          )

        }

      }catch(err){

        console.log(err)

      }

    }

    loadData()

  },[])

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

  function deleteContent(id){

    const updated =

      contents.filter(
        item => item.id !== id
      )

    setContents(updated)

    saveData(updated)

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

              onChange={(e)=>
                setNewContent({

                  ...newContent,

                  title:e.target.value

                })
              }
            />

            <textarea
              placeholder="Descrição"

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

              onChange={(e)=>
                setNewContent({

                  ...newContent,

                  cover:e.target.value

                })
              }
            />

            <input
              placeholder="Banner"

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

          {contents.map(content=>(

            <div
              className="contentEditor"
              key={content.id}
            >

              <h2>
                {content.title}
              </h2>

              <button
                className="watchEpisode"

                style={{
                  background:"#ff3030"
                }}

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

      {!adminOpen && (

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

    </div>

  )

}