import React, {useState} from "react";
import {axios} from 'axios';
import '../styles/styles.css';
function UserLogin(){

    const [data, setData] = useState({
        username: '',
        password: '',
    });

    function loginUser(e) {
        e.preventDeafult();

        axios.post('http://127.0.0.1:8000/api/login', data)
        .then(res =>{
            console.log(res);
            window.location.href = "/";
        })
        .catch(err =>{
            console.log(err);
        })
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

            <form onSubmit={loginUser} className='form' >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="email" className="form-control" id="username" name="username" onChange={e => handle(e)} value={data.username}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={e => handle(e)} value={data.password}/>
                </div>
                <p>Don't have an account yet? <a href="/register">Register</a></p>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
export default UserLogin;