import React, {useState} from "react";
import axios from 'axios';
import swal from 'sweetalert';
import '../styles/style.scss';


function UserLogin(){
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    async function loginUser(e) {
        e.preventDefault();

       let resp = await axios.post('https://students-records-laravel.herokuapp.com/api/login', data);
       if(resp.data.status === 200){
        localStorage.setItem('user', JSON.stringify(resp.data));
        swal("Login Successfully!", "Redirecting...", "success");
        setTimeout(() => window.location.href = "/dashboard", 1000);
       }else{
        swal("Invalid Credentials!", "Please check your username or password", "error");
       }
    }

    function handle(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

   
    return(
        <div className="wrapper">
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand logo" href="/">Student's Records</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  active" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="login-content">
            <form onSubmit={loginUser} className='form' >
            <p className="form-title">Login Form</p>
                <div className="mb-3">
                <input type="email" className="form-control input-effect" id="username" name="username" onChange={e => handle(e)} value={data.username} placeholder=" " required autoComplete="off"/>
                    <label htmlFor="username" className="form-label form-lbl label-effect">Username</label>
                </div>
                <div className="mb-3">
                <input type="password" className="form-control input-effect" id="password" name="password" onChange={e => handle(e)} value={data.password} placeholder=" " required autoComplete="off"/>
                    <label htmlFor="password" className="form-label form-lbl label-effect">Password</label>
                </div>
                <p>Don't have an account yet? <a href="/register">Register</a></p>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            </div>
            <footer className='footer-bar'>
                   <ul className='footer-menu-texts'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                   </ul>
                   <div className='footer-line'></div>
                   <span>© 2022 MLGCL, INC.</span>
                </footer>
        </div>
    );
}
export default UserLogin;