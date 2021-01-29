import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import logo from '../../assets/logo/mainlogo.png';
import '../Header/header.scss';
import fire from '../../config/fire';

function Header(props) {

    const logout = () => {
        fire.auth().signOut();
        props.history.push('/');
    }
    // console.log(user)

    return (
        <header className="header">
            <Link to="/" className="header__logo-link">
                <img className="header__logo-image" src={logo} alt="instock logo"/>
            </Link>
            <button className="header__logout-link" onClick={logout}>Log Out</button>
            </header>
            )
        }
        


export default withRouter(Header)
