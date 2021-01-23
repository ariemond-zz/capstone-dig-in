import React from 'react';
import '../SignUp/signUp.scss';
import {Link} from 'react-router-dom';
import fire from '../../config/fire';

class Login extends React.Component {

    state = {
        email: "",
        password: "",
        confirm: ""
    }

    signUp = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
            }).then((u) => {console.log(u)})
            .catch((error) => {
                console.log(error);
            })
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }


    render(){
        return (
            <section className="signup">
                <div className="signup__header">
                    <h1 className="signup__title">Stop going out.</h1>
                    <h1 className="signup__title2">Start digging in.</h1>
                </div>
                <div className="signup__form-div">
                    <h5 className="signup__form-header">Sign up to get started:</h5>
                    <form className="signup__form">
                        <input 
                        className="signup__email-input" 
                        type="text" 
                        placeholder="Email" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleChange}/>
                        <input 
                        className="signup__password-input"
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.handleChange}/>
                        <input 
                        className="signup__password-input"
                        type="password" 
                        placeholder="Confirm password" 
                        name="confirm" 
                        value={this.state.confirm}
                        onChange={this.handleChange}/>
                        <button type="submit" onClick={this.signUp} className="signup__button">Sign Up</button>
                    </form>
                </div>  
                <div className="signup__signup-div">
                    <p className="signup__signup">Already have an account?</p>
                    <Link to="/login" className="signup__signup-link"><p className="signup__signup">Log In.</p></Link>
                </div>
            </section>
        )
    }
};

export default Login
