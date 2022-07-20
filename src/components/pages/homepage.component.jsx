import React, {useState} from "react";
import '../styles/style.scss';

function HomePage(){

    const [data, setData] = useState({
        username: '',
        password: '',
    });


    function handle(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }


    return (
        <div className='wrapper'>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand logo" href="/">Student's Records</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <div className="content">
                <div className="homepage-left">
                    <div className="home-title">
                        <h3>MLG COLLEGE OF LEARNING, INC.</h3>
                        <p>Hilongos, Leyte</p>
                    </div>
                    <div className="home-description">
                        <p>We keep students records and information that are listed in our school.</p>
                    </div>
                    <div className="home-content-btns">
                        <a href="/login"><button type="button" className="login-btn home-btn">Login</button></a>
                        <a href="/register"><button type="button" className="register-btn home-btn">Register</button></a>
                    </div>
                </div>
                <div className="homepage-right">
                <form onSubmit="" className='form' >
                    <div className="mb-3">
                        <p className="form-title">Message Us</p>
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input type="email" className="form-control" id="username" name="username" onChange={e => handle(e)} value={data.username} placeholder="username@gmail.com" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={e => handle(e)} value={data.title} placeholder="title" required/>
                    </div>
                    <div className="mb-3">
                        <textarea name="message" id="message" className="message" placeholder="Message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
                </div>
            </div>
        {/* <div className='content'>
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
        </div> */}

        <footer className='footer-bar'>
            <div className='footer-left'>
                <p>Terms and Conditions</p>
                <p>Privacy and Policy</p>
             </div>
            <div className='footer-center'>
                <p>egoron@mlgcl.edu.ph</p>
                <p>egoronweb@egoron.info</p>
            </div>
            <div className='footer-right'>
                <p>facebook</p>
                <p>Youtube</p>
            </div>
        </footer>

    </div>
    );
}

export default HomePage;