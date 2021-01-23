import React from 'react';
import '../Login/login.scss';
import {Link} from 'react-router-dom';
import fire from '../../config/fire';

class Login extends React.Component {

    state = {
        email: "",
        password: ""
    }

    login = e => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) =>{
            }).catch((error) => {
                console.log(error);
            });
    }


    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }


    render(){
        return (
            <section className="login">
                <div className="login__header">
                    <h1 className="login__title">Stop going out.</h1>
                    <h1 className="login__title2">Start digging in.</h1>
                </div>
                <div className="login__form-div">
                    <h5 className="login__form-header">Log in to get started:</h5>
                    <form className="login__form">
                        <input 
                        className="login__email-input" 
                        type="text" 
                        placeholder="Email" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleChange}/>
                        <input 
                        className="login__password-input"
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.handleChange}/>
                        <button type="submit" onClick={this.login} className="login__button">Submit</button>
                    </form>
                </div>  
                <div className="login__signup-div">
                    <p className="login__signup">Don't have an account?</p>
                    <Link to="/signup" className="login__signup-link"><p className="login__signup">Sign Up.</p></Link>
                </div>
            </section>
        )
    }
};

export default Login
