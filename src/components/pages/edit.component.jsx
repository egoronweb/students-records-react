
import React from "react";
import axios from "axios";
import swal from 'sweetalert';

class EditInfo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            subject_code: '',
            descriptive_title: '',
            semester: '',
            year: '',
            grade: '',
            re_exam: '',
            userFullname: '',
        }

    }

     async componentDidMount() {
        const student_id = this.props.match.params.id;

        let resp = await axios.get(`https://students-records-laravel.herokuapp.com/api/dashboard/edit/${student_id}`);
        let userInfo = JSON.parse(localStorage.getItem('user'));
        if(!userInfo || userInfo === null){
            window.location.href = '/error';
        }else{
            if(resp.data.status === 200){
                this.setState({
                      first_name: resp.data.student.first_name,
                      last_name: resp.data.student.last_name,
                      subject_code: resp.data.student.subject_code,
                      semester: resp.data.student.semester,
                      year: resp.data.student.year,
                      grade: resp.data.student.grade,
                      re_exam: resp.data.student.re_exam,
                      userFullname: userInfo.user.fullname,
                  });
              }
        } 
    }


    updateStudent = async (e) => {
        e.preventDefault();
        const student_id = this.props.match.params.id;

                const resp = await axios.put(`https://students-records-laravel.herokuapp.com/api/dashboard/edit/update/${student_id}`, this.state);
                if(resp.data.status === 200){
                swal("Information Updated Successfully!","Redirecting...", "success");
                setTimeout(() => window.location.href = "/dashboard", 1000);
                    this.setState({
                        first_name: '',
                        last_name: '',
                        subject_code: '',
                        descriptive_title: '',
                        semester: '',
                        year: '',
                        grade: '',
                        re_exam: '',
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
                                <a className="nav-link" href="/dashboard/create">Add Student</a>
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
                <form onSubmit={this.updateStudent} className='form update-form' >
                    <div className="btn-back-container">
                    <a href="/dashboard" className="btn btn-primary btn-back"><span className="material-symbols-outlined">undo</span>Back</a>
                        <p></p>
                    </div>
                    <div className="mb-3">
                    <input type="text" maxLength="40" className="form-control input-effect" id="first_name" name="first_name" value={this.state.first_name} onChange = {e => this.setState({first_name:e.target.value})} required autoComplete="off" autoCapitalize="words"/>
                        <label htmlFor="first_name" className="form-label form-lbl label-effect">Full Name</label>
                    </div>
                    <div className="mb-3">
                    <input type="text" maxLength="40" className="form-control input-effect" id="last_name" name="last_name" value={this.state.last_name} onChange = {e => this.setState({last_name:e.target.value})} required autoComplete="off" autoCapitalize="words"/>
                        <label htmlFor="last_name" className="form-label form-lbl label-effect">Last Name</label>
                    </div>
                    <div className="mb-3">
                    <input type="text" maxLength="40" className="form-control input-effect" id="subject_code" name="subject_code" value={this.state.subject_code} onChange = {e => this.setState({subject_code:e.target.value})} required autoComplete="off" autoCapitalize="on"/>
                        <label htmlFor="subject_code" className="form-label form-lbl label-effect">Subject Code</label>
                    </div>
                    <div className="mb-3">
                    <input type="text" maxLength="40" className="form-control input-effect" id="descriptive_title" name="descriptive_title" value={this.state.descriptive_title} onChange = {e => this.setState({descriptive_title:e.target.value})} required autoComplete="off" autoCapitalize="on"/>
                        <label htmlFor="descriptive_title" className="form-label form-lbl label-effect">Descriptive Title</label>
                    </div>
                    <div className="mb-3">
                    <select name="semester" id="semester" className="form-control input-effect" onChange = {e => this.setState({semester:e.target.value})} value={this.state.semester}>
                        <option disabled selected = "true" required>--select semester--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                        <label htmlFor="semester" className="form-label form-lbl label-effect">Semester</label>
                    </div>
                    <div className="mb-3">
                    <select name="year" id="year" className="form-control input-effect" onChange = {e => this.setState({year:e.target.value})} value={this.state.year}>
                        <option disabled selected = "true" required>--select school year--</option>
                        <option value="1999-2000">1999-2000</option>
                        <option value="2000-2001">2000-2001</option>
                        <option value="2001-2002">2001-2002</option>
                        <option value="2002-2003">2002-2003</option>
                        <option value="2003-2004">2003-2004</option>
                        <option value="2004-2005">2004-2005</option>
                        <option value="2005-2006">2005-2006</option>
                        <option value="2006-2007">2006-2007</option>
                        <option value="2007-2008">2007-2008</option>
                        <option value="2008-2009">2008-2009</option>
                        <option value="2009-2010">2009-2010</option>
                        <option value="2010-2011">2010-2011</option>
                        <option value="2011-2012">2011-2012</option>
                        <option value="2012-2013">2012-2013</option>
                        <option value="2013-2014">2013-2014</option>
                        <option value="2014-2015">2014-2015</option>
                        <option value="2015-2016">2015-2016</option>
                        <option value="2016-2017">2016-2017</option>
                        <option value="2017-2018">2017-2018</option>
                        <option value="2018-2019">2018-2019</option>
                    </select>
                        <label htmlFor="year" className="form-label form-lbl label-effect">School Year</label>
                    </div>
                    <div className="mb-3">
                    <input type="number" step="0.01" min="1.0" max="5.0" className="form-control input-effect" id="final_grade" name="final_grade" onChange = {e => this.setState({final_grade:e.target.value})} value={this.state.final_grade} required autoComplete="off"/>
                        <label htmlFor="final_grade" className="form-label form-lbl label-effect">Final Grade</label>
                    </div>
                    <button type="submit" className="btn btn-warning btn-update">Update</button>
                </form>
                </div>
                <footer className='footer-bar'>
                   <ul className='footer-menu-texts'>
                        <li><a href="/dashboard">Home</a></li>
                        <li><a href="/dashboard/create">Add Student</a></li>
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