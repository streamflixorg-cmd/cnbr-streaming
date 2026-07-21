import React from "react";

export default function Banner({
  item,
  onPlay,
}) {
  if (!item) return null;

  return (
    <section
      className="banner"
      style={{
        backgroundImage: `url(${item.image})`,
      }}
    >
      <div className="banner-overlay">
        <div className="banner-content">
          <h1>{item.title}</h1>

          {item.description && (
            <p>{item.description}</p>
          )}

          <button
            className="watch-button"
            onClick={() => onPlay(item)}
          >
            ▶ Assistir
          </button>
        </div>
      </div>
    </section>
  );
}