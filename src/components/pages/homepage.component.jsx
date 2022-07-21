import React, {useState} from "react";
import '../styles/style.scss';
import { send } from 'emailjs-com';
import swal from 'sweetalert';

function HomePage(){

    const [toSend, setToSend] = useState({
        sender: '',
        receiver: '',
        message: '',
        receiver_email: '',
      });
    
      const onSubmit = (e) => {e.preventDefault();
        send('service_4igfe3y', 'template_tpwdw5c', toSend, 'bo1dd7DyK9JWPqNPs')
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            swal("Message Sent!", "Please wait...", "success");
            setTimeout(() => window.location.href = "/", 1000);
          })
          .catch((err) => {
            console.log('FAILED...', err);
            swal("Message not sent!", "Please try again!", "error");
          });
      };
    
      const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
      };
    

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
                        <p>We keep students records and grades information that are listed in our school.</p>
                    </div>
                    <div className="home-content-btns">
                        <a href="/login"><button type="button" className="login-btn home-btn">Login</button></a>
                        <a href="/register"><button type="button" className="register-btn home-btn">Register</button></a>
                    </div>
                </div>
                <div className="homepage-right">
                <form onSubmit={onSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="sender" className="form-label">Sender</label>
                        <input type='text' name='sender' className="form-control" placeholder='Your Name' value={toSend.sender} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="receiver" className="form-label">Receiver</label>
                        <input type='text' name='receiver' className="form-control" placeholder='Receiver Name' value={toSend.receiver} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="receiver_email" className="form-label">Receiver Email</label>
                        <input type='text' name='receiver_email' className="form-control" placeholder='Receiver Email' value={toSend.receiver_email} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <textarea name="message" id="message" className="form-control" placeholder="Your Message" value={toSend.message} onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send Message</button>
                    <span className="note-red"><strong>Note</strong>&nbsp;that this is only a testing message form. Your message will be sent to my account even though you type another account. It will still send directly to me.</span>
                </form>
                </div>
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

export default HomePage;