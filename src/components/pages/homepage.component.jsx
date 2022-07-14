import React from "react";
import '../styles/style.scss';

function HomePage(){

    return (
        <div className='wrapper'>
            <nav className="navbar">
                <div className="navbar-logo">Student's Record</div>
                <ul className="navbar-texts">
                    <span className="material-symbols-outlined">home</span><a href="/">Home</a>
                    <span className="material-symbols-outlined">login</span><a href="/login">Login</a>
                    <span className="material-symbols-outlined">how_to_reg</span><a href="/register">Register</a>
                </ul>
            </nav>
        
        <div className='content'>
            <div className="home-title">
                <h5>MLG COLLEGE OF LEARNING, INC.</h5>
                <p>Hilongos, Leyte</p>
            </div>

            <div className="home-content">
                <p>Student's Records</p>
                <p></p>

                <div className="home-content-btns">
                    <a href="/login"><button type="button" className="login-btn home-btn">Login</button></a>
                    <a href="/register"><button type="button" className="register-btn home-btn">Register</button></a>
                </div>
            </div>
        </div>
    </div>
    );
}

export default HomePage;