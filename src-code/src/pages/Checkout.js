import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import { PostData } from '../utils/PostData';
import { Collapse } from 'react-bootstrap';
import Header from '../components/Header';
import "../assets/css/checkout.css";

function Checkout() {

    const navigate = useNavigate();
    const shippingForm = useRef();
    const pickupForm = useRef();
    const refSendInvoiceBtn = useRef();
    const [openShipping, setOpenShipping] = useState(false);
    const [openPickup, setOpenPickup] = useState(false);
    const [cartItems, setCartItems] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [subtotal, setSubtotal] = useState(
        cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    );
    const [hst, setHst] = useState(subtotal * 0.13);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(subtotal + hst + shipping);
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const [sendInvoiceBtn, setSendInvoiceBtn] = useState("Send Quote Request");
    const [error, setError] = useState(null);
    const [order, setOrder] = useState(null);

    function formatPrice(price) {
        return `$${(price / 100).toFixed(2)}`;
    }

    useEffect(() => {
        const newHst = Math.round((subtotal + shipping) * 0.13);
        const newTotal = subtotal + newHst + shipping;
        setHst(newHst);
        setTotal(newTotal);
    }, [subtotal, shipping]);

    function handleSubmit() {

        setError(null);
        setSendInvoiceBtn(<Spinner animation="border" size="sm" />);
        refSendInvoiceBtn.current.disabled = true;

        if (openShipping) {
            const formData = new FormData(shippingForm.current);
            const customer_info = validateForm(formData);
            if (customer_info) {
                sendQuote(customer_info);
            }
        } else if (openPickup) {
            const formData = new FormData(pickupForm.current);
            const customer_info = validateForm(formData);
            if (customer_info) {
                sendQuote(customer_info);
            }
        } else {
            setError("Please select a shipping method");
            refSendInvoiceBtn.current.disabled = false;
            setSendInvoiceBtn("Send Quote Request");
        }
    }

    async function sendQuote(customer_info) {

        const fulfillmentType = openShipping ? 'SHIPMENT' : 'PICKUP';
        customer_info.fulfillmentType = fulfillmentType;

        PostData('request-quote.php', { customer_info: customer_info, cart: cartItems })
            .then((response) => {
                if (!response.status) {
                    setError(response.error);
                    setSendInvoiceBtn("Send Quote Request");
                    refSendInvoiceBtn.current.disabled = false;
                } else {
                    localStorage.removeItem("cart");
                    navigate("/thankyou");
                }
            })
            .catch((error) => {
                setError(error.message);
                refSendInvoiceBtn.current.disabled = false;
            });

    }

    function handleOpenShipping() {
        setOpenShipping(!openShipping);
        setOpenPickup(false);

        if (!openShipping) {
            setShipping(2000);
        } else {
            setShipping(0);
        }
    }

    function handleOpenPickup() {
        setOpenPickup(!openPickup);
        setOpenShipping(false);
        setShipping(0);
    }

    function validateForm(formData) {
        const data = Object.fromEntries(formData.entries());
        let isValid = true;

        for (const [key, value] of Object.entries(data)) {
            if (!value && key !== "apt") {
                setError(`The field ${key} is required`);
                refSendInvoiceBtn.current.disabled = false;
                setSendInvoiceBtn("Send Quote Request");
                isValid = false;
                break;
            }
        }
        return isValid ? data : null;
    }

    return (
        <>
            <Header />
            <main>
                <center>
                    <section className='checkout-form'>
                        <h1 className='time-regular'>
                            Quote Details
                        </h1>
                        <hr className='w-100' />
                        <div className='checkout-options'>
                            <input
                                type="checkbox"
                                id="shipping"
                                checked={openShipping}
                                onChange={handleOpenShipping}
                            />
                            <label htmlFor="shipping">Shipping + $20.00</label>
                        </div>
                        <div className='checkout-options mb-3'>
                            <input
                                type="checkbox"
                                id="pickup"
                                checked={openPickup}
                                onChange={handleOpenPickup}
                            />
                            <label htmlFor="pickup">Pickup</label>
                        </div>
                        {error && <Alert variant="danger" style={{ width: '100%' }}>{error}</Alert>}
                        <Collapse className='shipping-form-info' in={openShipping}>
                            <div id="example-collapse-text">
                                <form className="w-100" id="shipping-form" ref={shippingForm}>
                                    <div className="row">
                                        <div
                                            className="input-container col-6"
                                            id="address-form"
                                        >
                                            <input
                                                required
                                                type="text"
                                                id="first-name"
                                                className="checkout-input"
                                                placeholder="First Name"
                                                name="first-name"
                                                aria-label="First Name"
                                            />
                                        </div>

                                        <div className="input-container col-6">
                                            <input
                                                required
                                                type="text"
                                                id="last-name"
                                                className="checkout-input"
                                                placeholder="Last Name"
                                                name="last-name"
                                                aria-label="Last Name"
                                            />
                                        </div>
                                    </div>

                                    <div className="input-container">
                                        <input
                                            required
                                            type="text"
                                            id="email"
                                            className="checkout-input"
                                            placeholder="Email"
                                            name="email"
                                            aria-label="Email"
                                        />
                                    </div>

                                    <div className="input-container">
                                        <input
                                            required
                                            type="text"
                                            id="phone"
                                            className="checkout-input"
                                            placeholder="Phone"
                                            name="phone"
                                            aria-label="Phone Number"
                                        />
                                    </div>

                                    <div className="input-container">
                                        <input
                                            required
                                            type="text"
                                            id="street"
                                            className="checkout-input"
                                            placeholder="Street"
                                            name="street"
                                            aria-label="Street Address"
                                        />
                                    </div>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            id="Apt / Suite / Unit"
                                            className="checkout-input"
                                            placeholder="Apt / Suite / Unit (optional)"
                                            name="apt"
                                            aria-label="Apt / Suite / Unit (optional)"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="input-container col-6">
                                            <input
                                                required
                                                type="text"
                                                id="city"
                                                className="checkout-input"
                                                placeholder="City"
                                                name="city"
                                                aria-label="City"
                                            />
                                        </div>

                                        <div className="input-container col-6">
                                            <select
                                                data-field="country_id"
                                                name="country"
                                                className="checkout-input"
                                                id="country_id"
                                                defaultValue=""
                                                aria-label="Country"
                                            >
                                                <option
                                                    value=""
                                                    disabled=""
                                                >
                                                    Select Country
                                                </option>
                                                <option value="CA">Canada</option>
                                                <option value="US">United States</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-container col-6">
                                            <input
                                                required
                                                type="text"
                                                id="postal-code"
                                                className="checkout-input"
                                                placeholder="Postal Code"
                                                name="postal-code"
                                                aria-label="Postal Code"
                                            />
                                        </div>
                                        <div className="input-container col-6">
                                            <input
                                                required
                                                type="text"
                                                id="province"
                                                className="checkout-input"
                                                placeholder="Province/State"
                                                name="province"
                                                aria-label="Province/State"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Collapse>

                        <Collapse in={openPickup}>
                            <div id="example-collapse-text">
                                <form id="pickup-form" ref={pickupForm}>
                                    <div>
                                        <div className="row">
                                            <div
                                                className="input-container col-6"
                                                id="address-form"
                                            >
                                                <input
                                                    required
                                                    type="text"
                                                    id="first-name"
                                                    className="checkout-input"
                                                    placeholder="First Name"
                                                    name="first-name"
                                                    aria-label="First Name"
                                                />
                                            </div>

                                            <div className="input-container col-6">

                                                <input
                                                    required
                                                    type="text"
                                                    id="last-name"
                                                    className="checkout-input"
                                                    placeholder="Last Name"
                                                    name="last-name"
                                                    aria-label="Last Name"
                                                />
                                            </div>
                                        </div>

                                        <div className="input-container">
                                            <input
                                                required
                                                type="text"
                                                id="email"
                                                className="checkout-input"
                                                placeholder="Email"
                                                name="email"
                                                aria-label="Email"
                                            />
                                        </div>

                                        <div className="input-container">
                                            <input
                                                required
                                                type="text"
                                                id="phone"
                                                className="checkout-input"
                                                placeholder="Phone"
                                                name="phone"
                                                aria-label="Phone Number"
                                            />
                                        </div>
                                        <center>
                                            Billing Address
                                        </center>
                                        <hr />
                                        <div className="input-container">
                                            <input
                                                required
                                                type="text"
                                                id="street"
                                                className="checkout-input"
                                                placeholder="Street"
                                                name="street"
                                                aria-label="Street Address"
                                            />
                                        </div>
                                        <div className="input-container">
                                            <input
                                                type="text"
                                                id="Apt / Suite / Unit"
                                                className="checkout-input"
                                                placeholder="Apt / Suite / Unit (optional)"
                                                name="apt"
                                                aria-label="Apt / Suite / Unit (optional)"
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="input-container col-6">
                                                <input
                                                    required
                                                    type="text"
                                                    id="city"
                                                    className="checkout-input"
                                                    placeholder="City"
                                                    name="city"
                                                    aria-label="City"
                                                />
                                            </div>

                                            <div className="input-container col-6">
                                                <select
                                                    data-field="country_id"
                                                    name="country"
                                                    className="checkout-input"
                                                    id="country_id"
                                                    defaultValue=""
                                                    aria-label="Country"
                                                >
                                                    <option
                                                        value=""
                                                        disabled=""
                                                    >
                                                        Select Country
                                                    </option>
                                                    <option value="CA">Canada</option>
                                                    <option value="US">United States</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-container col-6">
                                                <input
                                                    required
                                                    type="text"
                                                    id="postal-code"
                                                    className="checkout-input"
                                                    placeholder="Postal Code"
                                                    name="postal-code"
                                                    aria-label="Postal Code"
                                                />
                                            </div>
                                            <div className="input-container col-6">
                                                <input
                                                    required
                                                    type="text"
                                                    id="province"
                                                    className="checkout-input"
                                                    placeholder="Province/State"
                                                    name="province"
                                                    aria-label="Province/State"
                                                />
                                            </div>
                                            <div className="input-container">
                                                <label
                                                    className="checkout-label"
                                                    htmlFor="pickup-date"
                                                >
                                                    Estimated Date For Pickup: <br />
                                                    *Please allow us to confirm the date via email
                                                </label>
                                                <input
                                                    required
                                                    id="pickup-date"
                                                    className="checkout-input mb-3"
                                                    type="date"
                                                    name="pickup-date"
                                                    min={formattedToday}
                                                    aria-label="Pick Up Date"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Collapse>

                    </section>
                    <section className='checkout-cart-total'>
                        <div className='checkout-prices'>
                            <div>SubTotal:</div>
                            <div>{formatPrice(subtotal)}</div>
                        </div>
                        <hr />
                        <div className='checkout-prices'>
                            <div>HST:</div>
                            <div>{formatPrice(hst)}</div>
                        </div>
                        <div className='checkout-prices'>
                            <div>Shipping:</div>
                            <div>{formatPrice(shipping)}</div>
                        </div>
                        <hr />
                        <div className='checkout-prices'>
                            <div>Total:</div>
                            <div>{formatPrice(total)}</div>
                        </div>
                    </section>
                    <center>
                        <button className='send-quote-btn my-3' onClick={handleSubmit} ref={refSendInvoiceBtn}>{sendInvoiceBtn}</button>
                    </center>
                </center>
            </main>
        </>
    );

}

export default Checkout;
