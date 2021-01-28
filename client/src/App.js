import React, {useState, useEffect} from 'react';
import fire from './config/fire';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import DinerForm from './components/DinerForm/DinerForm';
import ChefList from './components/ChefList/ChefList';
import ChefProfile from './components/ChefProfile/ChefProfile';

function App(){
  const [user, setUser] = useState(undefined);
  const [listenerAdded, setListenerAdded] = useState(false);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('isAuthenticated', 'true');
        console.log(user)
      } else {
        setUser(null);
        localStorage.removeItem('isAuthenticated');
      }
    });
    setListenerAdded(true);
  }

  useEffect(() => {
    if (!listenerAdded) {
      authListener();
    }
  }, [listenerAdded]);

  const handleLogin = (user) => {
    setUser(user);
  };


  function PrivateRoute({component: Component, ...rest}) {
    return <Route {...rest} render={(props) => (localStorage.isAuthenticated ? <Component {...props}/> : <Redirect to="/login"/>)}/>;
  }

    return (
      <div className="App">
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path='/' exact component={SignUp}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={Login} handler={handleLogin}/>
          <PrivateRoute path='/diner' component={DinerForm} user={user}/>
          <PrivateRoute path='/chefs' exact component={ChefList} user={user}/>
          <Route path="/chefs/:id" render={(routerProps) => <ChefProfile {...routerProps} user={user}/>}/>
        </Switch>
    </BrowserRouter>
    </div>
    );
  }





export default App;
