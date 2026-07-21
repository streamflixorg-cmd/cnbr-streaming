import React from "react";

export default function AdminPanel({
  children,
  visible,
  onClose,
}) {
  if (!visible) return null;

  return (
    <div className="admin-overlay">
      <div className="admin-panel">

        <div className="admin-header">
          <h2>Painel Administrativo</h2>

          <button
            className="admin-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="admin-body">
          {children}
        </div>

      </div>
    </div>
  );
}