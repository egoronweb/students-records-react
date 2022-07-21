
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
            userFullname: '',
        }

    }

     async componentDidMount() {
        const student_id = this.props.match.params.id;

        let resp = await axios.get(`http://192.168.2.109:8000/api/dashboard/edit/${student_id}`);
        let userInfo = JSON.parse(localStorage.getItem('user'));
        if(!userInfo || userInfo === null){
            window.location.href = '/login';
        }else{
            if(resp.data.status === 200){
                this.setState({
                      fullname: resp.data.student.fullname,
                      semester: resp.data.student.semester,
                      year: resp.data.student.year,
                      year_level: resp.data.student.year_level,
                      final_grade: resp.data.student.final_grade,
                      userFullname: userInfo.user.fullname,
                  });
              }
        } 
    }


    updateStudent = async (e) => {
        e.preventDefault();
        const student_id = this.props.match.params.id;

                const resp = await axios.put(`http://192.168.2.109:8000/api/dashboard/edit/update/${student_id}`, this.state);
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


    clearUser = () => {
        localStorage.removeItem('user');
    }

    render(){

        let userFullname = this.state.userFullname;
        return(
            <div className="wrapper">
            <nav className="navbar navbar-expand-lg bg-light" id='navbar'>
                <div className="container-fluid">
                    <a className="navbar-brand logo" id='logo' href="/">Student's Records</a>
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
                            <li className="nav-item nav-item-float-right">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userFullname}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Acount Settings</a></li>
                                        <li><a className="dropdown-item" href="/login" onClick={this.clearUser}>Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

                <div className="content">
                    <form onSubmit={this.updateStudent} className='form' >
                    <div className="btn-back-container">
                    <a href="/dashboard" className="btn btn-primary btn-back"><span className="material-symbols-outlined">undo</span>Back</a>
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
                <footer className='footer-bar'>
                   <ul className='footer-menu-texts'>
                        <li><a href="/dashboard">Home</a></li>
                        <li><a href="/dashboard/create">Create</a></li>
                        <li><a href="/login" onClick={this.clearUser}>Logout</a></li>
                   </ul>
                   <div className='footer-line'></div>
                   <span>© 2022 MLGCL, INC.</span>
                </footer>
            </div>
        );
    }
}

export default EditInfo;