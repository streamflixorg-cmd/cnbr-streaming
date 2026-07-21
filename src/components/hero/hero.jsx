import "./hero.css";

export default function hero() {
    return (
        <section className="hero">

            <div className="heroOverlay"/>

            <div className="heroContent">

                <span className="heroTag">
                    STREAMFLIX ORIGINAL
                </span>

                <h1>
                    Bem-vindo ao Streamflix
                </h1>

                <p>
                    Assista filmes e séries em um só lugar.
                </p>

                <div className="heroButtons">

                    <button className="playButton">
                        ▶ Assistir
                    </button>

                    <button className="infoButton">
                        ℹ Mais informações
                    </button>

                </div>

            </div>

        </section>
    );
}