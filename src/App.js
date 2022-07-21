import Homepage from './components/pages/homepage.component';
import UserRegister from './components/users/user-register.component';
import CreateInfo from './components/pages/create.component';
import UserLogin from './components/users/login.component';
import Dashboard from './components/users/dashboard.component';
import EditInfo from './components/pages/edit.component';
import Landing from './components/pages/error-landing.component';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import './App.css';



function App() {
// const hasAccess = localStorage.getItem('isAuth');

// function ProtectedRoutes (component, ...rest) {
//   if(hasAccess){
//     return(
//       <component/>
//     );
//   }else{
//     window.location.href = "/error";
//   }
// };

// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//     document.getElementById("logo").style.fontSize = "30px";
//   } else {
//     document.getElementById("logo").style.fontSize = "40px";
//   }
// }
  return (
      <Router>
        <Switch>
          <Route exact path = "/" component={Homepage}/>
          <Route exact path = "/error" component={Landing} />
          <Route exact path = "/register" component={UserRegister} />
          <Route exact path = "/login" component={UserLogin} />
          {/* <ProtectedRoutes> */}
            <Route exact path= "/dashboard" component={Dashboard} />
            <Route exact path = "/dashboard/create" component={CreateInfo} />
            <Route exact path = "/dashboard/edit/:id" component={EditInfo} />
          {/* </ProtectedRoutes> */}
        </Switch>
      </Router>
  );
}

export default App;
