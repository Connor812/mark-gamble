import React, { useContext } from 'react';
import { DataContext } from "../DataProvider";

function AdminHeader() {

    const { isLoggedIn, logout } = useContext(DataContext);

    return (
        <nav className="admin-header">
            <h2>Mark Gamble Admin</h2>
            {isLoggedIn ? <button onClick={(e) => logout(e)}><h2>Logout</h2></button> : ''}
        </nav>
    )
}

export default AdminHeader;
