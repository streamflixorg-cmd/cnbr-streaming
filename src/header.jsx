import {
  Search,
  Home,
  Menu,
  Shield
} from "lucide-react"

export default function Header({

  menuOpen,

  setMenuOpen,

  setAdminOpen,

  setSelectedContent

}){

  return(

    <div className="topBar">

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

      {

        menuOpen && (

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

        )

      }

    </div>

  )

}