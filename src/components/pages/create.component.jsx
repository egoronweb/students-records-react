import React, {useState} from "react";
import axios from 'axios';
import '../styles/styles.css';



function CreateInfo(){

   
    const [data, setData] = useState({
        fullname: '',
        semester: '',
        year: '',
        final_grade: '',
    });

    async function saveStudent(e) {
        e.preventDefault();

        await axios.post('http://127.0.0.1:8000/api/create', {
            fullname: data.fullname,
            semester: data.semester,
            year: data.year,
            final_grade: data.final_grade,
        })
        .then(resp => {
            console.log(resp);
            window.location.href = "/create";
        })
        .catch(err => {
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
                            <a className="nav-link active nav" href="/">Home</a>
                            </li>
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

            <form onSubmit={saveStudent} className='form' >
                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="fullname" name="fullname" onChange={e => handle(e)} value={data.fullname}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="semester" className="form-label">Semester</label>
                    <input type="number" className="form-control" id="semester" name="semester" onChange={e => handle(e)} value={data.semester}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input type="text" className="form-control" id="year" name="year" onChange={e => handle(e)} value={data.year}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="finak_grade" className="form-label">Final Grade</label>
                    <input type="number" step="0.01" className="form-control" id="final_grade" name="final_grade" onChange={e => handle(e)} value={data.final_grade}/>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}
export default CreateInfo;