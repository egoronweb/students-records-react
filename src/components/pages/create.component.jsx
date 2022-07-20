import React, {useState} from "react";
import axios from 'axios';
import swal from 'sweetalert';
import '../styles/style.scss';



function CreateInfo(){

   
    const [data, setData] = useState({
        fullname: '',
        semester: '',
        year: '',
        year_level: '',
        final_grade: '',
    });

    async function saveStudent(e) {
        e.preventDefault();

        await axios.post('http://127.0.0.1:8000/api/create', {
            fullname: data.fullname,
            semester: data.semester,
            year: data.year,
            year_level: data.year_level,
            final_grade: data.final_grade,
        })
        .then(resp => {
            swal("Created Successfully!", "Wait for a moment...", "success");
            setTimeout(() => window.location.href = "/dashboard/create", 1000);
        })
        .catch(err => {
            swal(err, "Please fill-up again", "failed");

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
                    <a className="navbar-brand logo" href="/">Student's Records</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/dashboard">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/dashboard/create">Create</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <form onSubmit={saveStudent} className='form' >
                <div className="btn-back-container">
                <button className="btn btn-primary btn-back"><span className="material-symbols-outlined">undo</span><a href="/dashboard">Back</a></button>
                    <p></p>
                </div>
                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input type="text" maxLength="40" className="form-control" id="fullname" name="fullname" onChange={e => handle(e)} value={data.fullname} placeholder="Fullname" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="semester" className="form-label">Semester</label>
                    <input type="number" min="1" max="2" className="form-control" id="semester" name="semester" onChange={e => handle(e)} value={data.semester} placeholder="1" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input type="text" className="form-control" id="year" name="year" onChange={e => handle(e)} value={data.year} placeholder="2000-2001" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="year_level" className="form-label">Year Level</label>
                    <input type="number" min="1" max="4" className="form-control" id="year_level" name="year_level" onChange={e => handle(e)} value={data.year_level} placeholder="1" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="final_grade" className="form-label">Final Grade</label>
                    <input type="number" step="0.01" min="1.0" max="5.0" className="form-control" id="final_grade" name="final_grade" onChange={e => handle(e)} value={data.final_grade} placeholder="1.0" required/>
                </div>
                <button type="submit" className="btn btn-primary btn-save">Save</button>
            </form>
        </div>
    );
}
export default CreateInfo;