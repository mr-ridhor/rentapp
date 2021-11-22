import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Login from './Screens/Login'
import Register from './Screens/Register';
import Private from './Screens/Private';
import PrivateRoute from './components/Routings/PrivateRoute';


function App() {
  return (

    <Router>
      <div className="app">
        <Switch >
          <PrivateRoute exact path="/" component={Private}/>
          <Route  path="/login" component={Login}/>
          <Route  path="/register" component={Register}/>
          
        </Switch>
      </div>
    </Router>

  );
}

export default App;
