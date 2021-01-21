import React from 'react';
import fire from './config/fire';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import DinerForm from './components/DinerForm/DinerForm';
import ChefList from './components/ChefList/ChefList';
import ChefProfile from './components/ChefProfile/ChefProfile';


class App extends React.Component {

  state = {
    user: {}
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {           //called whenever the authentication state changes
      console.log(user);
      if (user) {                   
        this.setState({user});
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({user: null});
        localStorage.removeItem('user');
      }
    });
  }

  // {this.state.user ? (<DinerForm />) : (<Login />)}

render() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/diner' component={DinerForm}/>
        <Route path='/chefs' component={ChefList}/>
        <Route path="/chefs/:id" render={(routerProps) => <ChefProfile {...routerProps}/>}/>
      </Switch>
    </BrowserRouter>
    </div>
    );
    
  }
}




export default App;
