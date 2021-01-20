import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import DinerForm from './components/DinerForm/DinerForm';
import ChefList from './components/ChefList/ChefList';
import ChefProfile from './components/ChefProfile/ChefProfile';


function App() {


  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/diner' component={DinerForm}/>
        <Route path='/chefs' componen={ChefList}/>
        <Route path="/chefs/:id" render={(routerProps) => <ChefProfile {...routerProps}/>}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
