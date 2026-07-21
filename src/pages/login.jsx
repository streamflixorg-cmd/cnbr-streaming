import "./Login.css";

export default function Login() {
    return (
        <div className="login">

            <div className="loginBox">

                <h1>STREAMFLIX</h1>

                <h2>Administrador</h2>

                <input
                    type="email"
                    placeholder="E-mail"
                />

                <input
                    type="password"
                    placeholder="Senha"
                />

                <button>
                    Entrar
                </button>

            </div>

        </div>
    );
}