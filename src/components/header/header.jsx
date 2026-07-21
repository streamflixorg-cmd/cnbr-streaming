import "./Header.css";

export default function Header() {
    return (
        <header className="header">

            <div className="logo">
                STREAMFLIX
            </div>

            <nav className="menu">

                <button>Início</button>

                <button>Filmes</button>

                <button>Séries</button>

                <button>Minha Lista</button>

            </nav>

            <div className="actions">

                <input
                    type="text"
                    placeholder="Pesquisar..."
                />

                <button className="profileButton">
                    👤
                </button>

            </div>

        </header>
    );
}