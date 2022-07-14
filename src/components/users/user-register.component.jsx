import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import '../styles/style.scss';
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
            swal("Users Added Successfully!", "Redirecting...", "success");
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
            <nav className="navbar">
                <div className="navbar-logo">Student's Record</div>
                <ul className="navbar-texts">
                    <span class="material-symbols-outlined">home</span><a href="/">Home</a>
                    <span class="material-symbols-outlined">login</span><a href="/login">Login</a>
                    <span class="material-symbols-outlined">how_to_reg</span><a href="/register">Register</a>
                </ul>
            </nav>

            <form onSubmit={saveUser} className='form' >
                <div className="mb-3">
                <p className="form-title">Register Form</p>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="email" className="form-control" id="username" name="username" onChange={e => handle(e)} value={userData.username} placeholder="username@gmail.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={e => handle(e)} value={userData.password} required placeholder="Password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="re_password" className="form-label">Retype-Password</label>
                    <input type="password" className="form-control" id="re_password" name="re_password" onChange={e => handle(e)} value={userData.re_password} required placeholder="Password"/>
                </div>
                <p>Already have an account?<a href="/login">Login</a></p>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}
export default UserRegister;