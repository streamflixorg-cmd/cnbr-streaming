import { useEffect, useState } from "react";
import "./featuredcarousel.css";

export default function featuredcarousel({ movies = [] }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (movies.length === 0) return;

        const timer = setInterval(() => {
            setCurrent((prev) =>
                prev === movies.length - 1 ? 0 : prev + 1
            );
        }, 6000);

        return () => clearInterval(timer);
    }, [movies]);

    if (movies.length === 0) return null;

    const movie = movies[current];

    return (
        <section
            className="featuredcarousel"
            style={{
                backgroundImage: `url(${movie.banner})`
            }}
        >
            <div className="featuredOverlay">

                <div className="featuredContent">

                    <span>{movie.category}</span>

                    <h1>{movie.title}</h1>

                    <p>{movie.description}</p>

                    <div className="featuredButtons">

                        <button className="watch">
                            ▶ Assistir
                        </button>

                        <button className="details">
                            Mais informações
                        </button>

                    </div>

                </div>

            </div>
        </section>
    );
}