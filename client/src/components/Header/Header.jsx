import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo/mainlogo.png';
import '../Header/header.scss';

function Header() {
    return (
        <header className="header">
            <Link to="/" className="header__logo-link">
                <img className="header__logo-image" src={logo} alt="instock logo"/>
            </Link>
        </header>
    )
}

export default Header
