import './App.css';
import Home from './components/home'
import Login from './components/login'
import { Route, Switch } from 'react-router-dom'



function App() {
  return (
   
      <Switch>
       <Route exact path="/" component={Home} />
       <Route exact path="/login" component={Login} />
      </Switch>
    
  );
}

export default App;
