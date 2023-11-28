import React from 'react';
import { Link, Outlet } from 'react-router-dom'

import './index.css'

const Layout = () => {
    return (
        <div className='layout'>
            <nav className='navigation'>
                <div className='logo' />
                <ul>
                    <li>
                        <Link className='react-link' to="/">Home</Link>
                    </li>
                    <li>
                        <Link className='react-link' to="/vote">Vote</Link>
                    </li>
                    <li>
                        <Link className='react-link' to="/results">Results</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;