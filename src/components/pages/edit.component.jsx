
import React from "react";
import axios from "axios";
import swal from 'sweetalert';

class EditInfo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            fullname: '',
            semester: '',
            year: '',
            year_level: '',
            final_grade: '',
        }

    }

     async componentDidMount() {
        const student_id = this.props.match.params.id;

        let resp = await axios.get(`http://127.0.0.1:8000/api/dashboard/edit/${student_id}`);
        console.log(resp);
        if(resp.data.status === 200){
          this.setState({
                fullname: resp.data.student.fullname,
                semester: resp.data.student.semester,
                year: resp.data.student.year,
                year_level: resp.data.student.year_level,
                final_grade: resp.data.student.final_grade,
            });
        }
        
    }


    updateStudent = async (e) => {
        e.preventDefault();
        const student_id = this.props.match.params.id;

                const resp = await axios.put(`http://127.0.0.1:8000/api/dashboard/edit/update/${student_id}`, this.state);
                if(resp.data.status === 200){
                swal("Users Updated Successfully!","Redirecting...", "success");
                setTimeout(() => window.location.href = "/dashboard", 1000);
                    this.setState({
                        fullname: '',
                        semester: '',
                        year: '',
                        year_level: '',
                        final_grade: '',
                    });
                }
    }



    render(){
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
                                <a className="nav-link active" aria-current="page" href="/dashboard">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard/create">Create</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

                <div className="content">
                    <form onSubmit={this.updateStudent} className='form' >
                    <div className="btn-back-container">
                        <a href="/dashboard"><button type="button" className="btn btn-primary btn-back">Back</button></a>
                    </div>
                        <div className="mb-3">
                            <label htmlFor="fullname" className="form-label">Full Name</label>
                            <input type="text" maxLength="40" className="form-control" id="fullname" name="fullname" onChange = {e => 
                            this.setState({fullname:e.target.value})}
                                value={this.state.fullname} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="semester" className="form-label">Semester</label>
                            <input type="number" min="1" max="2" className="form-control" id="semester" name="semester" onChange = {e => 
                            this.setState({semester:e.target.value})}
                            value = {this.state.semester} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input type="text" className="form-control" id="year" name="year" onChange={e => 
                            this.setState({year:e.target.value})}
                            value = {this.state.year} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="year_level" className="form-label">Year Level</label>
                            <input type="number" min="1" max="4" className="form-control" id="year_level" name="year_level" onChange = {e => 
                            this.setState({year_level:e.target.value})}
                            value = {this.state.year_level} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="final_grade" className="form-label">Final Grade</label>
                            <input type="number" step="0.01" min="1.0" max="5.0" className="form-control" id="final_grade" name="final_grade" onChange = {e => 
                            this.setState({final_grade:e.target.value})}
                            value = {this.state.final_grade} required/>
                        </div>
                        <button type="submit" className="btn btn-warning btn-update">Update</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditInfo;