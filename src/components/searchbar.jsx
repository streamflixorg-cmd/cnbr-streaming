import React from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Pesquisar..."
}) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
}