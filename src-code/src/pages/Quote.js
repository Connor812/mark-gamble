import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PostData } from "../utils/PostData";
import AdminHeader from "../components/AdminHeader";
import { TiArrowLeftThick } from "react-icons/ti";
import { Modal, Button, Spinner } from "react-bootstrap";
import "../assets/css/admin-quote.css";

function Quote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSendInvoice, setShowSendInvoice] = useState(false);
    const [order, setOrder] = useState({});
    const [items, setItems] = useState([]);
    const [invoice, setInvoice] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchInvoice = async (id) => {
        setLoading(true);
        setError(null);
        const result = await PostData("get-invoice-by-id.php", { invoice_id: id });
        if (!result.status) {
            setError(result.error);
            setLoading(false);
            return;
        }
        setOrder(result.order[0]);
        setItems(result.items);
        setInvoice(result.invoice);
        setLoading(false);
    };

    useEffect(() => {
        fetchInvoice(id);
    }, [id]);

    function sendQuote(id) {
        PostData("publish-invoice.php", { invoice_id: id, version: invoice.version }).then((result) => {
            if (!result.status) {
                navigate(`/dashboard/error/${encodeURIComponent(result.error)}`);
                return;
            }
            setShowSendInvoice(false);
            navigate(`/dashboard/success/${encodeURIComponent('Invoice Sent Successfully')}`);
        });
    }

    const formatDate = (date) => {
        const parsedDate = new Date(date);
        const year = parsedDate.getFullYear();
        const day = String(parsedDate.getDate()).padStart(2, "0");
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        return `${year} - ${month} - ${day}`;
    };

    const formatPrice = (price) => `$${(price / 100).toFixed(2)} `;

    return (
        <>
            <AdminHeader />
            {loading ? (
                <main className="loading">
                    <Spinner />
                </main>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <main className="display-quote-wrapper">
                    <section className="display-quote">
                        {invoice.status === "DRAFT" && (
                            <div className="quote-action-btns-container">
                                <button
                                    className="admin-send-quote-btn"
                                    onClick={() => setShowSendInvoice(!showSendInvoice)}
                                >
                                    Send Quote
                                </button>
                            </div>
                        )}
                        <Link to="/dashboard" className="back">
                            <TiArrowLeftThick /> Back
                        </Link>
                        <h1>
                            {order.pickup_details
                                ? order.pickup_details.recipient.display_name
                                : order.shipment_details.recipient.display_name}
                        </h1>
                        <h5 className={invoice.status}>{invoice.status}</h5>
                        <hr className="quote-hr" />
                        <div className="quote-billing-address-wrapper">
                            {order.type === "PICKUP" ? (
                                <>
                                    <ul className="quote-billing-address">
                                        <li><b>Billing Address</b></li>
                                        <li>{order.pickup_details.recipient.address.address_line_1}</li>
                                        <li>{`${order.pickup_details.recipient.address.locality}, ${order.pickup_details.recipient.address.administrative_district_level_1}, ${order.pickup_details.recipient.address.postal_code} `}</li>
                                        <li><a href={`mailto:${order.pickup_details.recipient.email_address} `}>{order.pickup_details.recipient.email_address}</a></li>
                                        <li><a href={`tel:${order.pickup_details.recipient.phone_number} `}>{order.pickup_details.recipient.phone_number}</a></li>
                                    </ul>
                                    <ul className="quote-billing-address">
                                        <li><b>Pickup Details</b></li>
                                        <li>{formatDate(order.pickup_details.pickup_at)}</li>
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <ul className="quote-billing-address">
                                        <li><b>Billing Address</b></li>
                                        <li>{order.shipment_details.recipient.address.address_line_1}</li>
                                        <li>{`${order.shipment_details.recipient.address.locality}, ${order.shipment_details.recipient.address.administrative_district_level_1}, ${order.shipment_details.recipient.address.postal_code} `}</li>
                                        <li><a href={`mailto:${order.shipment_details.recipient.email_address} `}>{order.shipment_details.recipient.email_address}</a></li>
                                        <li><a href={`tel:${order.shipment_details.recipient.phone_number} `}>{order.shipment_details.recipient.phone_number}</a></li>
                                    </ul>
                                    <ul className="quote-billing-address">
                                        <li><b>Shipping Address</b></li>
                                        <li>{order.shipment_details.recipient.address.address_line_1}</li>
                                        <li>{`${order.shipment_details.recipient.address.locality}, ${order.shipment_details.recipient.address.administrative_district_level_1}, ${order.shipment_details.recipient.address.postal_code} `}</li>
                                        <li><a href={`mailto:${order.shipment_details.recipient.email_address} `}>{order.shipment_details.recipient.email_address}</a></li>
                                        <li><a href={`tel:${order.shipment_details.recipient.phone_number} `}>{order.shipment_details.recipient.phone_number}</a></li>
                                    </ul>
                                </>
                            )}
                        </div>
                        <h5>Items</h5>
                        <hr />
                        <table className="quote-items-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Stock</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => {
                                    const itemQuantity = parseInt(item.quantity, 10);
                                    const stockQuantity = parseInt(item.inventory[0].quantity, 10);
                                    const className = stockQuantity >= itemQuantity ? "instock" : "out-of-stock";
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img
                                                    src={item.image || "/assets/images/product-1.png"}
                                                    alt="Product"
                                                    className="quote-product-img"
                                                />
                                            </td>
                                            <td>
                                                {item.name} <br />
                                                {item.variation_name}
                                            </td>
                                            <td>{formatPrice(item.price)}</td>
                                            <td>{itemQuantity}</td>
                                            <td className={className}>{stockQuantity}</td>
                                            <td>{formatPrice(item.price * itemQuantity)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Modal show={showSendInvoice} onHide={() => setShowSendInvoice(!showSendInvoice)} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Invoice</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <b><p className="m-0">Are You Sure You Want To Send This Invoice?</p></b>
                                <p>*Invoice will be sent to customer via email.</p>
                                <div className="send-quote-modal-container">
                                    <button
                                        className="admin-send-denial-btn"
                                        onClick={() => setShowSendInvoice(!showSendInvoice)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="admin-send-quote-btn"
                                        onClick={() => sendQuote(id)}
                                    >
                                        Send
                                    </button>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowSendInvoice(!showSendInvoice)}
                                >
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </section>
                </main>
            )}
        </>
    );
}

export default Quote;
