"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "../contexts/CartContext"

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)

  const handleCouponSubmit = (e) => {
    e.preventDefault()

    // Simulación de validación de cupón
    if (couponCode.toLowerCase() === "descuento10") {
      setCouponApplied(true)
      setCouponDiscount(10)
    } else {
      alert("Cupón no válido")
    }
  }

  const shipping = subtotal > 50 ? 0 : 4.99
  const couponAmount = couponApplied ? (subtotal * couponDiscount) / 100 : 0
  const total = subtotal + shipping - couponAmount

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <ShoppingBag size={64} className="empty-cart-icon" />
            <h2 className="empty-cart-title">Tu carrito está vacío</h2>
            <p className="empty-cart-message">Parece que aún no has añadido ningún producto a tu carrito.</p>
            <Link to="/" className="empty-cart-button">
              <ArrowLeft size={18} className="button-icon" />
              Continuar comprando
            </Link>
          </div>
        </div>

        <style jsx>{`
          .empty-cart {
            padding: var(--spacing-12) 0;
          }
          
          .empty-cart-content {
            max-width: 500px;
            margin: 0 auto;
            text-align: center;
          }
          
          .empty-cart-icon {
            margin: 0 auto var(--spacing-6);
            color: var(--color-gray-400);
          }
          
          .empty-cart-title {
            font-size: 1.75rem;
            margin-bottom: var(--spacing-4);
            color: var(--color-text-primary);
          }
          
          .empty-cart-message {
            margin-bottom: var(--spacing-8);
            color: var(--color-text-secondary);
          }
          
          .empty-cart-button {
            display: inline-flex;
            align-items: center;
            gap: var(--spacing-2);
            padding: var(--spacing-3) var(--spacing-6);
            background-color: var(--color-primary);
            color: white;
            border-radius: var(--radius-md);
            font-weight: 600;
            transition: all var(--transition-normal) ease;
          }
          
          .empty-cart-button:hover {
            background-color: var(--color-primary-dark);
            transform: translateY(-2px);
          }
          
          .button-icon {
            transition: transform var(--transition-normal) ease;
          }
          
          .empty-cart-button:hover .button-icon {
            transform: translateX(-3px);
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Tu carrito</h1>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-table-container">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="product-cell">
                            <img src={item.cover || "/placeholder.svg"} alt={item.title} className="product-image" />
                            <div className="product-info">
                              <h3 className="product-title">{item.title}</h3>
                              <p className="product-author">{item.author}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="quantity-controls">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="quantity-btn"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="quantity-btn"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td>
                          {item.discount ? (
                            <div className="price-cell">
                              <span className="current-price">{itemPrice.toFixed(2)}€</span>
                              <span className="original-price">{item.price.toFixed(2)}€</span>
                            </div>
                          ) : (
                            <span className="price">{itemPrice.toFixed(2)}€</span>
                          )}
                        </td>
                        <td>
                          <span className="total-price">{(itemPrice * item.quantity).toFixed(2)}€</span>
                        </td>
                        <td>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="remove-btn"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="cart-actions">
              <Link to="/" className="continue-shopping">
                <ArrowLeft size={18} className="icon" />
                Continuar comprando
              </Link>
              <button onClick={clearCart} className="clear-cart">
                Vaciar carrito
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h2 className="summary-title">Resumen del pedido</h2>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>

                <div className="summary-row">
                  <span>Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `${shipping.toFixed(2)}€`}</span>
                </div>

                {couponApplied && (
                  <div className="summary-row discount">
                    <span>Descuento ({couponDiscount}%)</span>
                    <span>-{couponAmount.toFixed(2)}€</span>
                  </div>
                )}

                <div className="summary-row total">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="coupon-section">
                <form onSubmit={handleCouponSubmit} className="coupon-form">
                  <input
                    type="text"
                    placeholder="Código de descuento"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <button type="submit" className="coupon-button">
                    Aplicar
                  </button>
                </form>
              </div>

              <Link to="/checkout" className="checkout-button">
                Proceder al pago
              </Link>

              <div className="summary-notes">
                <p>* Los precios incluyen IVA.</p>
                <p>* Envío gratuito para pedidos superiores a 50€.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page {
          padding-bottom: var(--spacing-16);
        }
        
        .page-title {
          font-size: 2rem;
          position: relative;
          padding-bottom: var(--spacing-4);
          margin-bottom: var(--spacing-8);
        }
        
        .page-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: var(--color-primary);
        }
        
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-8);
        }
        
        @media (min-width: 1024px) {
          .cart-layout {
            grid-template-columns: 2fr 1fr;
          }
        }
        
        .cart-items {
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        
        .cart-table-container {
          width: 100%;
          overflow-x: auto;
        }
        
        .cart-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .cart-table th {
          text-align: left;
          padding: var(--spacing-4);
          border-bottom: 1px solid var(--color-border);
          font-weight: 600;
          color: var(--color-text-secondary);
        }
        
        .cart-table td {
          padding: var(--spacing-4);
          border-bottom: 1px solid var(--color-border-light);
          vertical-align: middle;
        }
        
        .product-cell {
          display: flex;
          align-items: center;
        }
        
        .product-image {
          width: 64px;
          height: 80px;
          object-fit: cover;
          border-radius: var(--radius-md);
          margin-right: var(--spacing-4);
        }
        
        .product-title {
          font-weight: 600;
          margin-bottom: var(--spacing-1);
          color: var(--color-text-primary);
        }
        
        .product-author {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }
        
        .quantity-controls {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .quantity-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border: 1px solid var(--color-border);
          background-color: white;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .quantity-btn:hover {
          background-color: var(--color-gray-100);
          color: var(--color-primary);
        }
        
        .quantity-value {
          width: 30px;
          text-align: center;
          font-weight: 600;
          margin: 0 var(--spacing-2);
        }
        
        .price-cell {
          display: flex;
          flex-direction: column;
        }
        
        .current-price {
          font-weight: 600;
          color: var(--color-primary);
        }
        
        .original-price {
          font-size: 0.875rem;
          color: var(--color-text-tertiary);
          text-decoration: line-through;
        }
        
        .price {
          font-weight: 600;
        }
        
        .total-price {
          font-weight: 700;
        }
        
        .remove-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: transparent;
          color: var(--color-text-tertiary);
          border: none;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .remove-btn:hover {
          background-color: var(--color-gray-100);
          color: var(--color-danger);
        }
        
        .cart-actions {
          display: flex;
          justify-content: space-between;
          padding: var(--spacing-4);
          border-top: 1px solid var(--color-border-light);
        }
        
        .continue-shopping {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          color: var(--color-primary);
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .continue-shopping:hover {
          color: var(--color-primary-dark);
        }
        
        .continue-shopping .icon {
          transition: transform var(--transition-normal) ease;
        }
        
        .continue-shopping:hover .icon {
          transform: translateX(-3px);
        }
        
        .clear-cart {
          color: var(--color-text-tertiary);
          background: none;
          border: none;
          cursor: pointer;
          transition: color var(--transition-normal) ease;
        }
        
        .clear-cart:hover {
          color: var(--color-danger);
        }
        
        .order-summary {
          align-self: start;
        }
        
        .summary-card {
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-6);
        }
        
        .summary-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-6);
          padding-bottom: var(--spacing-3);
          border-bottom: 1px solid var(--color-border-light);
          color: var(--color-primary);
        }
        
        .summary-rows {
          margin-bottom: var(--spacing-6);
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: var(--spacing-2) 0;
        }
        
        .summary-row.discount {
          color: var(--color-success);
        }
        
        .summary-row.total {
          font-weight: 700;
          font-size: 1.125rem;
          padding-top: var(--spacing-3);
          margin-top: var(--spacing-3);
          border-top: 1px solid var(--color-border-light);
        }
        
        .coupon-section {
          margin-bottom: var(--spacing-6);
        }
        
        .coupon-form {
          display: flex;
        }
        
        .coupon-input {
          flex: 1;
          padding: var(--spacing-2) var(--spacing-3);
          border: 1px solid var(--color-border);
          border-right: none;
          border-radius: var(--radius-md) 0 0 var(--radius-md);
          font-size: 0.875rem;
        }
        
        .coupon-input:focus {
          outline: none;
          border-color: var(--color-primary);
        }
        
        .coupon-button {
          padding: var(--spacing-2) var(--spacing-4);
          background-color: var(--color-gray-200);
          color: var(--color-text-primary);
          border: 1px solid var(--color-border);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .coupon-button:hover {
          background-color: var(--color-gray-300);
        }
        
        .checkout-button {
          display: block;
          width: 100%;
          padding: var(--spacing-3) var(--spacing-4);
          background-color: var(--color-primary);
          color: white;
          text-align: center;
          font-weight: 600;
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-4);
          transition: all var(--transition-normal) ease;
        }
        
        .checkout-button:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }
        
        .summary-notes {
          font-size: 0.75rem;
          color: var(--color-text-tertiary);
        }
        
        .summary-notes p {
          margin-bottom: var(--spacing-1);
        }
        
        @media (max-width: 768px) {
          .product-image {
            width: 48px;
            height: 60px;
          }
          
          .cart-table th:nth-child(3),
          .cart-table td:nth-child(3) {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .product-image {
            display: none;
          }
          
          .quantity-controls {
            flex-direction: column;
            gap: var(--spacing-1);
          }
        }
      `}</style>
    </div>
  )
}

export default CartPage
