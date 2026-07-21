import "./poster.css";

export default function poster({ movie }) {
    return (
        <div className="poster">

            <img
                src={movie.cover}
                alt={movie.title}
            />

            <div className="posterGradient">

                <button>
                    ▶
                </button>

            </div>

        </div>
    );
}