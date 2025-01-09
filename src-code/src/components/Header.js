import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

function Header() {
    const [cartQty, setCartQty] = useState(0);

    // Function to calculate cart quantity from localStorage
    const calculateCartQty = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    useEffect(() => {
        // Update cart quantity on component mount
        setCartQty(calculateCartQty());

        // Event listener for localStorage changes
        const handleStorageChange = () => {
            setCartQty(calculateCartQty());
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <nav className='products-navbar'>
            <h2>Mark Gamble</h2>
            <ul>
                <li>
                    <Link to="/">CONTRACTING</Link>
                </li>
                <li>
                    <Link to="/">EXCAVATION</Link>
                </li>
                <li>
                    <Link to="/">MAINTENANCE</Link>
                </li>
                <li>
                    <Link to="/">CONTACT US</Link>
                </li>
                <li className='d-flex align-items-center'>
                    <Link className='d-flex align-items-center cart-icon' to="/cart">
                        <FaShoppingCart />
                        {cartQty > 0 && <span className="cart-qty-badge">{cartQty}</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
