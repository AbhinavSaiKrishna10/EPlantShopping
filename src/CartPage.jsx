import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += (parseFloat(item.cost.substring(1)) * item.quantity);
    });
    return total.toFixed(2);
  };

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateItemTotal = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  const handleCheckout = () => {
    alert('Checkout functionality to be added for future reference');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff!important',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div> <a href="#" onClick={() => navigate('/products')} style={styleA}>Plants</a></div>
          <div> <a href="#" onClick={() => navigate('/cart')} style={styleA}>
            <h1 className='cart'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                <rect width="156" height="156" fill="none"></rect>
                <circle cx="80" cy="216" r="12"></circle>
                <circle cx="184" cy="216" r="12"></circle>
                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path>
              </svg>
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </h1>
          </a></div>
        </div>
      </div>

      <div className="cart-container">
        <h2 style={{ color: 'black' }}>Shopping Cart</h2>
        <h3 style={{ color: 'black' }}>Total Items: {totalItems}</h3>
        <h3 style={{ color: 'black' }}>Total Amount: ${calculateTotalAmount()}</h3>
        
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h3>Your cart is empty</h3>
            <button className="get-started-button" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div>
              {cart.map(item => (
                <div className="cart-item" key={item.name}>
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-cost">{item.cost}</div>
                    <div className="cart-item-quantity">
                      <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                      <span className="cart-item-quantity-value">{item.quantity}</span>
                      <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                    </div>
                    <div className="cart-item-total">Subtotal: ${calculateItemTotal(item)}</div>
                    <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="continue_shopping_btn">
              <button className="get-started-button" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
              <br />
              <button className="get-started-button1" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage; 