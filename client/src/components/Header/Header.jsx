import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo/mainlogo.png';
import '../Header/header.scss';
import fire from '../../config/fire';

function Header() {

    // const logout = () => {
    //     fire.auth().signOut();
    // }

    return (
        <header className="header">
            <Link to="/" className="header__logo-link">
                <img className="header__logo-image" src={logo} alt="instock logo"/>
            </Link>
            </header>
            )
        }
        


export default Header
