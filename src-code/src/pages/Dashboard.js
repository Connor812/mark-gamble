import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostData } from "../utils/PostData";
import { Spinner, Alert } from "react-bootstrap";
import AdminHeader from "../components/AdminHeader";
import "../assets/css/dashboard.css";

function Dashboard() {
    const { status, message } = useParams();
    const [error, setError] = useState("");
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const navigation = useNavigate();

    function goToQuote(quote_id) {
        navigation(`/quote/${quote_id}`);
    }

    function formatPrice(price) {
        return `$${(price / 100).toFixed(2)}`;
    }

    useEffect(() => {
        PostData("get-invoices.php", {}).then((result) => {
            if (!result.status) {
                setError(result.error);
            }

            setInvoices(result.invoices);
            setLoading(false);
        });
    }, []);

    // Filter invoices based on selected filter and search term
    const filteredInvoices = invoices.filter((invoice) => {
        // Apply filter condition
        const matchesFilter = filter === "All" || invoice.status === filter;

        // Apply search condition (case-insensitive)
        const fullName = `${invoice.customer_info.given_name || "Unknown"} ${invoice.customer_info.family_name || ""}`.toLowerCase();
        const matchesSearch = fullName.includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <>
            <AdminHeader />

            <main className="dashboard-wrapper">
                <div className="quotes-action-btn-container">
                    <h2>Quotes</h2>
                    <div>
                        <label htmlFor="" className="mx-2">Filters</label>
                        <select onChange={(e) => setFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="PAID">PAID</option>
                            <option value="NOT PAID">NOT PAID</option>
                            <option value="DRAFT">DRAFT</option>
                        </select>
                    </div>
                    <div>
                        <label className="mx-2" htmlFor="">Search</label>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <hr />

                {status && message && (
                    status === "success" ? (
                        <Alert className="text-center" variant="success">{message}</Alert>
                    ) : (
                        <Alert className="text-center" variant="danger">{message}</Alert>
                    )
                )}

                {loading ? (
                    <div className="loading" style={{ flex: '1' }}>
                        <Spinner></Spinner>
                    </div>
                ) : (
                    <center className="p-3">
                        <table className="quote-table">
                            <thead>
                                <tr className="quote-legend">
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInvoices.map((invoice, index) => (
                                    <tr key={index} className="quote-row" onClick={() => goToQuote(invoice.invoice_id)}>
                                        <td>{`${invoice.customer_info.given_name || "Unknown"} ${invoice.customer_info.family_name || ""}`}</td>
                                        <td>{invoice.creation_date}</td>
                                        <td className={invoice.status}>{invoice.status}</td>
                                        <td>{formatPrice(invoice.price_info[0].computed_amount_money.amount)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </center>
                )}
            </main>
        </>
    );
}

export default Dashboard;
