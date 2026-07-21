import React from "react";

export default function Header({
  logo,
  search,
  setSearch,
  isAdmin,
  setIsAdmin,
}) {
  return (
    <header className="header">
      <div className="header-left">
        <img
          src={logo}
          alt="Streamflix"
          className="logo"
          draggable={false}
        />
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="header-right">
        <button
          className="admin-button"
          onClick={() => setIsAdmin(!isAdmin)}
        >
          {isAdmin ? "Fechar Admin" : "Admin"}
        </button>
      </div>
    </header>
  );
}