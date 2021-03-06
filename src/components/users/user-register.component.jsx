import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import '../styles/style.scss';
function UserRegister(){

    const [userData, setUserData] = useState({
        fullname: '',
        username: '',
        password: '',
        re_password: '',
    });


    function handle(e) {
        const newData = {...userData};
        newData[e.target.id] = e.target.value;
        setUserData(newData);
    }

    async function saveUser(e) {
        e.preventDefault();

        const resp = await axios.post('https://students-records-laravel.herokuapp.com/api/register', {
            fullname: userData.fullname,
            username: userData.username,
            password: userData.password,
            re_password: userData.re_password,
        });

        if(resp.data.status === 200){
            swal("Users Added Successfully!", "Redirecting...", "success");
            setTimeout(() => window.location.href = "/login", 1000);
        }else if(resp.data.status === 401){
            swal("Password not Match or Account already taken!", "Please check and try again!", "error");
        }else{
            swal("Error Request!", "Please try again after a few minutes!", "error");
        }

    };

   
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
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <form onSubmit={saveUser} className='form' >
            <p className="form-title">Register Form</p>
                <div className="mb-3">
                <input type="text" className="form-control input-effect" id="fullname" name="fullname" onChange={e => handle(e)} value={userData.fullname} placeholder=" " required autoComplete="off" autoCapitalize="words"/>
                    <label htmlFor="fullname" className="form-label form-lbl label-effect">Full Name</label>
                </div>
                <div className="mb-3">
                <input type="email" className="form-control input-effect" id="username" name="username" onChange={e => handle(e)} value={userData.username} placeholder=" " required autoComplete="off"/>
                    <label htmlFor="username" className="form-label form-lbl label-effect">Username</label>
                </div>
                <div className="mb-3">
                <input type="password" className="form-control input-effect" id="password" name="password" onChange={e => handle(e)} value={userData.password} placeholder=" " required autoComplete="off"/>
                    <label htmlFor="password" className="form-label form-lbl label-effect">Password</label>
                </div>
                <div className="mb-3">
                <input type="password" className="form-control input-effect" id="re_password" name="re_password" onChange={e => handle(e)} value={userData.re_password} placeholder=" " required autoComplete="off"/>
                    <label htmlFor="re_password" className="form-label form-lbl label-effect">Retype-Password</label>
                </div>
                <p>Already have an account?<a href="/login">Login</a></p>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>

            <footer className='footer-bar'>
                   <ul className='footer-menu-texts'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                   </ul>
                   <div className='footer-line'></div>
                   <span>?? 2022 MLGCL, INC.</span>
                </footer>
        </div>
    );
}
export default UserRegister;