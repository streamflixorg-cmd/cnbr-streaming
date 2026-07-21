import React from "react";

export default function MovieCard({
  item,
  onClick,
  showYear = true,
  showCategory = true,
}) {
  return (
    <div
      className="movie-card"
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick(item);
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="movie-card-image"
        loading="lazy"
        draggable={false}
      />

      <div className="movie-card-info">
        <h3>{item.title}</h3>

        {showCategory && item.category && (
          <span className="movie-category">
            {item.category}
          </span>
        )}

        {showYear && item.year && (
          <span className="movie-year">
            {item.year}
          </span>
        )}
      </div>
    </div>
  );
}