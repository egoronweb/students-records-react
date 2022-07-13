import React, { useState } from "react";
import axios from 'axios';
import '../styles/styles.css';
function UserRegister(){

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        re_password: '',
    });

    async function saveUser(e) {
        e.preventDefault();

        await axios.post('http://127.0.0.1:8000/api/register', {
            username: userData.username,
            password: userData.password,
            re_password: userData.re_password,
        })
        .then(resp => {
            console.log(resp);
            window.location.href = "/login";
        })
        .catch(err => {
            console.log(err);
        });
    }

    function handle(e) {
        const newData = {...userData};
        newData[e.target.id] = e.target.value;
        setUserData(newData);
    }
   
    return(
        <div className="wrapper">
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <a className="nav-link active nav" href="/register">Register</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link nav" href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <form onSubmit={saveUser} className='form' >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="email" className="form-control" id="username" name="username" onChange={e => handle(e)} value={userData.username}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={e => handle(e)} value={userData.password}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="re_password" className="form-label">Retype-Password</label>
                    <input type="password" className="form-control" id="re_password" name="re_password" onChange={e => handle(e)} value={userData.re_password}/>
                </div>
                <p>Already have an account?<a href="/login">Login</a></p>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}
export default UserRegister;