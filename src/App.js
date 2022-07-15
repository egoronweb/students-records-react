import Homepage from './components/pages/homepage.component';
import UserRegister from './components/users/user-register.component';
import CreateInfo from './components/pages/create.component';
import UserLogin from './components/users/login.component';
import Dashboard from './components/users/dashboard.component';
import EditInfo from './components/pages/edit.component';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import './App.css';


function App() {
  
  return (
      <Router>
        <Switch>
          <Route exact path = "/" component={Homepage}/>
          <Route exact path = "/register" component={UserRegister} />
          <Route exact path = "/login" component={UserLogin} />
          <Route exact path= "/dashboard" component={Dashboard} />
          <Route exact path = "/dashboard/create" component={CreateInfo} />
          <Route exact path = "/dashboard/edit/:id" component={EditInfo} />
        </Switch>
      </Router>
  );
}

export default App;
