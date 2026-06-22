import {
  useEffect,
  useState,
} from "react";

export default function Admin() {
  /* LOGIN */

  const [logged, setLogged] =
    useState(false);

  const [login, setLogin] =
    useState("");

  const [password, setPassword] =
    useState("");

  /* USERS */

  const [users, setUsers] =
    useState([]);

  const [newUser, setNewUser] =
    useState("");

  const [newPass, setNewPass] =
    useState("");

  /* CONTENT */

  const [content, setContent] =
    useState([]);

  /* LOAD */

  useEffect(() => {
    const savedUsers =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || [
        {
          login: "admin",
          password: "1234",
        },
      ];

    localStorage.setItem(
      "users",
      JSON.stringify(savedUsers)
    );

    setUsers(savedUsers);

    const savedContent =
      JSON.parse(
        localStorage.getItem(
          "movies"
        )
      ) || [];

    setContent(savedContent);
  }, []);

  /* SAVE */

  function save(updated) {
    setContent(updated);

    localStorage.setItem(
      "movies",
      JSON.stringify(updated)
    );
  }

  /* LOGIN */

  function handleLogin() {
    const found =
      users.find(
        (u) =>
          u.login ===
            login &&
          u.password ===
            password
      );

    if (!found) {
      alert(
        "Senha inválida"
      );

      return;
    }

    setLogged(true);
  }

  /* USERS */

  function addUser() {
    if (
      !newUser ||
      !newPass
    )
      return;

    const updated = [
      ...users,

      {
        login: newUser,
        password:
          newPass,
      },
    ];

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );

    setNewUser("");
    setNewPass("");
  }

  function deleteUser(
    login
  ) {
    const updated =
      users.filter(
        (u) =>
          u.login !== login
      );

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );
  }

  /* FILMES */

  function addMovie() {
    save([
      ...content,

      {
        id: Date.now(),

        type: "movie",

        title: "Novo Filme",

        desc: "",

        image: "",

        video: "",
      },
    ]);
  }

  /* SERIES */

  function addSeries() {
    save([
      ...content,

      {
        id: Date.now(),

        type: "series",

        title: "Nova Série",

        desc: "",

        image: "",

        seasons: [],
      },
    ]);
  }

  /* UPDATE */

  function updateContent(
    id,
    field,
    value
  ) {
    const updated =
      content.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      );

    save(updated);
  }

  /* DELETE */

  function deleteContent(id) {
    save(
      content.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  /* TEMPORADAS */

  function addSeason(
    seriesId
  ) {
    const updated =
      content.map((item) => {
        if (
          item.id !==
          seriesId
        )
          return item;

        return {
          ...item,

          seasons: [
            ...item.seasons,

            {
              id:
                Date.now(),

              title: `Temporada ${
                item.seasons
                  .length + 1
              }`,

              episodes: [],
            },
          ],
        };
      });

    save(updated);
  }

  function updateSeason(
    seriesId,
    seasonId,
    value
  ) {
    const updated =
      content.map((item) => {
        if (
          item.id !==
          seriesId
        )
          return item;

        return {
          ...item,

          seasons:
            item.seasons.map(
              (
                season
              ) =>
                season.id ===
                seasonId
                  ? {
                      ...season,
                      title:
                        value,
                    }
                  : season
            ),
        };
      });

    save(updated);
  }

  /* EPISODIOS */

  function addEpisode(
    seriesId,
    seasonId
  ) {
    const updated =
      content.map((item) => {
        if (
          item.id !==
          seriesId
        )
          return item;

        return {
          ...item,

          seasons:
            item.seasons.map(
              (
                season
              ) => {
                if (
                  season.id !==
                  seasonId
                )
                  return season;

                return {
                  ...season,

                  episodes: [
                    ...season.episodes,

                    {
                      id:
                        Date.now(),

                      title:
                        "Novo Episódio",

                      desc: "",

                      video:
                        "",
                    },
                  ],
                };
              }
            ),
        };
      });

    save(updated);
  }

  function updateEpisode(
    seriesId,
    seasonId,
    epId,
    field,
    value
  ) {
    const updated =
      content.map((item) => {
        if (
          item.id !==
          seriesId
        )
          return item;

        return {
          ...item,

          seasons:
            item.seasons.map(
              (
                season
              ) => {
                if (
                  season.id !==
                  seasonId
                )
                  return season;

                return {
                  ...season,

                  episodes:
                    season.episodes.map(
                      (
                        ep
                      ) =>
                        ep.id ===
                        epId
                          ? {
                              ...ep,
                              [field]:
                                value,
                            }
                          : ep
                    ),
                };
              }
            ),
        };
      });

    save(updated);
  }

  /* LOGIN */

  if (!logged) {
    return (
      <div
        style={{
          background:
            "black",

          minHeight:
            "100vh",

          display:
            "flex",

          justifyContent:
            "center",

          alignItems:
            "center",
        }}
      >
        <div
          style={{
            background:
              "#111",

            padding:
              "30px",

            borderRadius:
              "20px",

            width:
              "400px",
          }}
        >
          <h1
            style={{
              color:
                "#00ff66",

              marginBottom:
                "20px",
            }}
          >
            LOGIN ADM
          </h1>

          <input
            placeholder="Login"
            value={login}
            onChange={(e) =>
              setLogin(
                e.target.value
              )
            }
            style={{
              width:
                "100%",

              padding:
                "15px",

              marginBottom:
                "15px",
            }}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={{
              width:
                "100%",

              padding:
                "15px",

              marginBottom:
                "15px",
            }}
          />

          <button
            onClick={
              handleLogin
            }
            style={{
              width:
                "100%",

              padding:
                "15px",

              background:
                "#00ff66",

              border:
                "none",

              fontWeight:
                "bold",
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background:
          "black",

        color:
          "white",

        minHeight:
          "100vh",

        padding:
          "30px",
      }}
    >
      <h1
        style={{
          color:
            "#00ff66",
        }}
      >
        STREAMFLIXX
        ADMIN
      </h1>

      {/* USERS */}

      <div
        style={{
          background:
            "#111",

          padding:
            "20px",

          borderRadius:
            "20px",

          marginTop:
            "20px",
        }}
      >
        <h2>
          Usuários
        </h2>

        <input
          placeholder="Novo usuário"
          value={newUser}
          onChange={(e) =>
            setNewUser(
              e.target.value
            )
          }
        />

        <input
          placeholder="Senha"
          value={newPass}
          onChange={(e) =>
            setNewPass(
              e.target.value
            )
          }
        />

        <button
          onClick={addUser}
        >
          Criar Usuário
        </button>

        {users.map((u) => (
          <div
            key={u.login}
          >
            {u.login}

            <button
              onClick={() =>
                deleteUser(
                  u.login
                )
              }
            >
              Excluir
            </button>
          </div>
        ))}
      </div>

      {/* ACTIONS */}

      <div
        style={{
          display:
            "flex",

          gap: "20px",

          marginTop:
            "30px",
        }}
      >
        <button
          onClick={
            addMovie
          }
        >
          + Filme
        </button>

        <button
          onClick={
            addSeries
          }
        >
          + Série
        </button>
      </div>

      {/* CONTEÚDOS */}

      {content.map(
        (item) => (
          <div
            key={item.id}
            style={{
              background:
                "#111",

              padding:
                "20px",

              borderRadius:
                "20px",

              marginTop:
                "30px",
            }}
          >
            <input
              value={
                item.title
              }
              onChange={(
                e
              ) =>
                updateContent(
                  item.id,
                  "title",
                  e.target
                    .value
                )
              }
            />

            <textarea
              value={
                item.desc
              }
              onChange={(
                e
              ) =>
                updateContent(
                  item.id,
                  "desc",
                  e.target
                    .value
                )
              }
            />

            <input
              value={
                item.image
              }
              onChange={(
                e
              ) =>
                updateContent(
                  item.id,
                  "image",
                  e.target
                    .value
                )
              }
            />

            {/* FILME */}

            {item.type ===
              "movie" && (
              <input
                value={
                  item.video
                }
                onChange={(
                  e
                ) =>
                  updateContent(
                    item.id,
                    "video",
                    e.target
                      .value
                  )
                }
                placeholder="Vídeo"
              />
            )}

            {/* SERIES */}

            {item.type ===
              "series" && (
              <>
                <button
                  onClick={() =>
                    addSeason(
                      item.id
                    )
                  }
                >
                  +
                  Temporada
                </button>

                {item.seasons.map(
                  (
                    season
                  ) => (
                    <div
                      key={
                        season.id
                      }
                    >
                      <input
                        value={
                          season.title
                        }
                        onChange={(
                          e
                        ) =>
                          updateSeason(
                            item.id,
                            season.id,
                            e.target
                              .value
                          )
                        }
                      />

                      <button
                        onClick={() =>
                          addEpisode(
                            item.id,
                            season.id
                          )
                        }
                      >
                        +
                        Episódio
                      </button>

                      {season.episodes.map(
                        (
                          ep
                        ) => (
                          <div
                            key={
                              ep.id
                            }
                          >
                            <input
                              value={
                                ep.title
                              }
                              onChange={(
                                e
                              ) =>
                                updateEpisode(
                                  item.id,
                                  season.id,
                                  ep.id,
                                  "title",
                                  e
                                    .target
                                    .value
                                )
                              }
                            />

                            <textarea
                              value={
                                ep.desc
                              }
                              onChange={(
                                e
                              ) =>
                                updateEpisode(
                                  item.id,
                                  season.id,
                                  ep.id,
                                  "desc",
                                  e
                                    .target
                                    .value
                                )
                              }
                            />

                            <input
                              value={
                                ep.video
                              }
                              onChange={(
                                e
                              ) =>
                                updateEpisode(
                                  item.id,
                                  season.id,
                                  ep.id,
                                  "video",
                                  e
                                    .target
                                    .value
                                )
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  )
                )}
              </>
            )}

            <button
              onClick={() =>
                deleteContent(
                  item.id
                )
              }
            >
              Excluir
            </button>
          </div>
        )
      )}
    </div>
  );
}