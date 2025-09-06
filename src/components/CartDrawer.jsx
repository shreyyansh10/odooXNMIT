import React from "react";
import "./CartDrawer.css";

const CartDrawer = ({ open, onClose, items = [] }) => {
  const total = items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cd-overlay ${open ? "show" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Drawer */}
      <aside
        className={`cd-drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        <header className="cd-header">
          <h3>My Cart</h3>
          <button className="cd-close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </header>

        <div className="cd-content">
          {items.length === 0 ? (
            <p className="cd-empty">Your cart is empty.</p>
          ) : (
            <ul className="cd-list">
              {items.map((it) => (
                <li key={it.id} className="cd-item">
                  <div className="cd-item-info">
                    <div className="cd-item-title">{it.title}</div>
                    <div className="cd-item-meta">
                      Qty: {it.qty || 1} · ₹{it.price?.toFixed(2) ?? "0.00"}
                    </div>
                  </div>
                  <div className="cd-item-subtotal">
                    ₹{((it.price || 0) * (it.qty || 1)).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="cd-footer">
          <div className="cd-total">
            <span>Subtotal</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>
          <button className="cd-cta" disabled={items.length === 0}>
            Checkout
          </button>
        </footer>
      </aside>
    </>
  );
};

export default CartDrawer;
