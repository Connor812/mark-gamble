import React from 'react';
import { DataProvider } from "./DataProvider";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';
import Quote from './pages/Quote';
import DisplayProduct from './pages/DisplayProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Thankyou from './pages/Thankyou';
import Helmet from 'react-helmet';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/gamble.css";
import "./assets/css/custom.css";
import "./assets/css/carpet.css";
import "./assets/css/admin-general.css";

function App() {
  return (
    <Router>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </Router>
  );
}

function AppContent() {
  return (
    <>
      <Helmet>
        <title>Mark Gamble</title>
        <meta name="description" content="Mark Gamble" />
        <meta name="keywords" content="" />
        <meta name="author" content="Mark Gamble" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<DisplayProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoutes element={<Dashboard />} />} />
        <Route path="/dashboard/:status/:message" element={<ProtectedRoutes element={<Dashboard />} />} />
        <Route path="/quote/:id" element={<ProtectedRoutes element={<Quote />} />} />
      </Routes>
    </>
  );
}

export default App;