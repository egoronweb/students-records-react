import React, {useState} from "react";
import axios from 'axios';
import swal from 'sweetalert';
import '../styles/style.scss';



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
            swal("Created Successfully!", "Redirecting...", "success");
            window.location.href = "/dashboard/create";
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
            <nav className="navbar">
                <div className="navbar-logo">Student's Record</div>
                <ul className="navbar-texts">
                    <span className="material-symbols-outlined">home</span><a href="/dashboard">Home</a>
                    <span className="material-symbols-outlined">login</span><a href="/dashboard/create">Create</a>
                    <span className="material-symbols-outlined">logout</span><a href="/login">Logout</a>
                </ul>
            </nav>

            <form onSubmit={saveStudent} className='form' >
                <div className="btn-back-container">
                    <a href="/dashboard"><button type="button" className="btn btn-primary btn-back">Back</button></a>
                </div>
                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input type="text" maxLength="40" className="form-control" id="fullname" name="fullname" onChange={e => handle(e)} value={data.fullname} placeholder="Fullname"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="semester" className="form-label">Semester</label>
                    <input type="number" min="1" max="2" className="form-control" id="semester" name="semester" onChange={e => handle(e)} value={data.semester} placeholder="1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input type="text" className="form-control" id="year" name="year" onChange={e => handle(e)} value={data.year} placeholder="2000-2001"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="final_grade" className="form-label">Final Grade</label>
                    <input type="number" step="0.01" min="1.0" max="5.0" className="form-control" id="final_grade" name="final_grade" onChange={e => handle(e)} value={data.final_grade} placeholder="1.0"/>
                </div>
                <button type="submit" className="btn btn-primary btn-save">Save</button>
            </form>
        </div>
    );
}
export default CreateInfo;