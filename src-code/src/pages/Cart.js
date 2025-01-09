import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Row, Col } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiArrowLeftThick } from "react-icons/ti";
import { UpdateQuantity } from "../utils/UpdateQuantity";
import { RemoveItem } from "../utils/RemoveItem";
import "../assets/css/cart.css";

function Cart() {

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [proceedToQuoteBtn, setProceedToQuoteBtn] = useState("Proceed To Quote");

    function formatCart(price) {
        return `$${(price / 100).toFixed(2)}`;
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.13;
    const shipping = 0;
    const total = subtotal + tax + shipping;

    function handleProceedToQuote() {
        if (cartItems.length === 0) {
            setProceedToQuoteBtn("Your cart is empty.");
            setTimeout(() => {
                setProceedToQuoteBtn("Proceed To Quote");
            }, 3000);
            return;
        }
        navigate("/checkout");
    }

    return (
        <>
            <Header />
            <main>
                <div className="cart-header">
                    <Link className="back p-2 pb-0" to="/products"><TiArrowLeftThick /> Back</Link>
                    <h1 className="mx-2">Your Cart</h1>
                </div>
                <section className="cart-container">
                    <div className="cart-items-container">
                        <Row className="cart-table-headings">
                            <Col sm={4} md={6}>Item</Col>
                            <Col sm={4} md={3}>Quantity</Col>
                            <Col sm={4} md={3}>Subtotal</Col>
                        </Row>
                        {cartItems.length === 0 ? (
                            <div>Cart is empty</div>
                        ) : (
                            cartItems.map((item, index) => {
                                console.log(item);

                                return (
                                    <Row className="cart-item" key={index}>
                                        <Col md={6} className="cart-item-column">
                                            <div className="cart-image-container">
                                                <img className="cart-product-img" src={item.image} alt="product" />
                                                <div className="cart-item-info">
                                                    <h5 className="cart-item-name">{item.name}</h5>
                                                    {item.variation && <div className="cart-item-variation">{item.variation}</div>}
                                                    <div>
                                                        Price: {formatCart(item.price)}
                                                    </div>
                                                    <button className="remove-from-cart-btn" onClick={() => RemoveItem(cartItems, setCartItems, item.id)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={3} className="quantity-container cart-item-column">
                                            <button className="cart-quantity-btn" onClick={() => UpdateQuantity(cartItems, setCartItems, "subtract", item)}>
                                                <IoIosArrowDown />
                                            </button>
                                            <div className="quantity-input">
                                                {item.quantity}
                                            </div>
                                            <button className="cart-quantity-btn" onClick={() => UpdateQuantity(cartItems, setCartItems, "increase", item)}>
                                                <IoIosArrowUp />
                                            </button>
                                        </Col>
                                        <Col md={3} className="cart-subtotal cart-item-column">
                                            {formatCart(item.price * item.quantity)}
                                        </Col>
                                    </Row>)
                            })
                        )}
                    </div>
                    <div className="cart-total-container">
                        <div className="cart-total">
                            <div className="checkout-btn-container">
                                <button onClick={handleProceedToQuote} className="checkout-btn">{proceedToQuoteBtn}</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Cart;
