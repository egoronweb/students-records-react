import Homepage from './components/pages/homepage.component';
import UserRegister from './components/users/user-register.component';
import CreateInfo from './components/pages/create.component';
import UserLogin from './components/pages/login.component';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    
      <Router>
        <Switch>
          <Route exact path = "/" component={Homepage}/>
          <Route exact path = "/register" component={UserRegister} />
          <Route exact path = "/create" component={CreateInfo} />
          <Route exact path = "/login" component={UserLogin} />
        </Switch>
      </Router>
  );
}

export default App;
