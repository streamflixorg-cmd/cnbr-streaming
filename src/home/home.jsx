import "./home.css";
import header from "../../components/header/header";
import hero from "../../components/hero/hero";
import row from "../../components/row/row";

const movies = [

    {
        id:1,
        title:"Avatar",
        cover:"https://picsum.photos/300/450?1"
    },

    {
        id:2,
        title:"Batman",
        cover:"https://picsum.photos/300/450?2"
    },

    {
        id:3,
        title:"Superman",
        cover:"https://picsum.photos/300/450?3"
    },

    {
        id:4,
        title:"Interestelar",
        cover:"https://picsum.photos/300/450?4"
    },

    {
        id:5,
        title:"The Boys",
        cover:"https://picsum.photos/300/450?5"
    },

    {
        id:6,
        title:"Invencível",
        cover:"https://picsum.photos/300/450?6"
    }

];

export default function home(){

    return(

        <div className="home">

            <header/>

            <hero/>

            <row
                title="Em alta"
                movies={movies}
            />

            <row
                title="Filmes"
                movies={movies}
            />

            <row
                title="Séries"
                movies={movies}
            />

        </div>

    );

}