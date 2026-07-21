import "./row.css";
import poster from "./poster";

export default function row({ title, movies }) {

    return (

        <section className="row">

            <h2>{title}</h2>

            <div className="rowScroll">

                {movies.map(movie=>(
                    <Poster
                        key={movie.id}
                        movie={movie}
                    />
                ))}

            </div>

        </section>

    );

}