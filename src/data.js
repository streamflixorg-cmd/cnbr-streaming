const movies = [
  {
    id: 1,

    type: "movie",

    title: "Avatar",

    desc: "Filme épico",

    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",

    video:
      "https://www.youtube.com/watch?v=d9MyW72ELq0",
  },

  {
    id: 2,

    type: "series",

    title: "Breaking Bad",

    desc: "Série criminal",

    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",

    seasons: [
      {
        id: 1,

        title:
          "Temporada 1",

        episodes: [
          {
            id: 1,

            title:
              "Episódio 1",

            desc:
              "Piloto",

            video:
              "https://www.youtube.com/watch?v=HhesaQXLuRY",
          },
        ],
      },
    ],
  },
];

export default movies;