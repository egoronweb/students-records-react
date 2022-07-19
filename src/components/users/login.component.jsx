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

       let resp = await axios.post('http://127.0.0.1:8000/api/login', data);
       if(resp.data.status === 200){
        localStorage.setItem('users', JSON.stringify(resp.data));
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
            <nav className="navbar">
                <div className="navbar-logo">Student's Record</div>
                    <ul className="navbar-texts">
                        <span className="material-symbols-outlined">home</span><a href="/">Home</a>
                        <span className="material-symbols-outlined">login</span><a href="/login">Login</a>
                        <span className="material-symbols-outlined">how_to_reg</span><a href="/register">Register</a>
                    </ul>
                </nav>

            <form onSubmit={loginUser} className='form' >
                <div className="mb-3">
                    <p className="form-title">Login Form</p>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="email" className="form-control" id="username" name="username" onChange={e => handle(e)} value={data.username} placeholder="username@gmail.com" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={e => handle(e)} value={data.password} required placeholder="Password"/>
                </div>
                <p>Don't have an account yet? <a href="/register">Register</a></p>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
export default UserLogin;