import React from 'react';
import '../Login/login.scss';
import {Link} from 'react-router-dom';

class Login extends React.Component {

    state = {
        email: "",
        password: "",
        submitEnabled: false
    }

    updateEmail = e => {
        this.setState({
            email: e.target.value
        }, this.checkSubmitEnabled())
    };

    updatePassword = e => {
        this.setState({
            password: e.target.value
        }, this.checkSubmitEnabled())
    };

    checkSubmitEnabled = () => {
        let isEnabled = false;
        if ((this.state.email !== '' &&
            this.state.password !== '')
            ) {
                isEnabled = true;
            }
            this.setState({
                submitEnabled: isEnabled
            });
    };

    handleClick = () => {
        this.props.history.push('/diner');
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
                        placeholder="Enter email..." 
                        name="email" 
                        value={this.state.email}
                        onChange={this.updateEmail}/>
                        <input 
                        className="login__password-input"
                        type="password" 
                        placeholder="Enter password..." 
                        name="password" 
                        value={this.state.password}
                        onChange={this.updatePassword}/>
                        <button type="button" onClick={this.handleClick} disabled={!this.state.submitEnabled} className="login__button">Submit</button>
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
