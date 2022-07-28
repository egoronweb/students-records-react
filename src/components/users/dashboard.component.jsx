import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/style.scss';


class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            students: [],
            fullname: '',
            loading: true,
            nameSearchField: '',
            yearSearchField: '',
        }
    }

    
    async componentDidMount(){
        const resp = await axios.get('https://students-records-laravel.herokuapp.com/api/dashboard');
        let userInfo = JSON.parse(localStorage.getItem('user'));
        if(!userInfo || userInfo === null){
            window.location.href = '/error';
            console.log('You are not Authrozied');
        }else{
            const alphaNames = resp.data.students.sort((a, b) => a.last_name.localeCompare(b.last_name));
            if(resp.data.status === 200){
                this.setState({
                    students: alphaNames,
                    loading: false,
                    fullname: userInfo.user.fullname,
                });
        }
        }
    }

   
    deleteStudent = async (e, id) =>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this information!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if(willDelete) {
                swal("Information Deleted!","Wait for a moment...", {
                    icon: "success",
                  });
              axios.delete(`https://students-records-laravel.herokuapp.com/api/dashboard/delete/${id}`)
              .then(res => {
                setTimeout(() => window.location.href = "/dashboard", 1000);
              }).catch(err => {
                swal("The information cannot be deleted!");
              })
            } else {
              swal("The information is safe!");
            }
          });
    }
   

   
    clearUser = () => {
        localStorage.removeItem('user');
    }
    render(){

        let userFullname = this.state.fullname;
       
        const filteredStudentsByName = this.state.students.filter((student) => {
            return student.last_name.toLocaleLowerCase().includes(this.state.nameSearchField) || student.first_name.toLocaleLowerCase().include(this.state.nameSearchField)|| 
            student.year.includes(this.state.nameSearchField);
        });
        // const filteredStudentsByYear = this.state.students.filter((student) => {
        //     return student.year.includes(this.state.yearSearchField);
        // });
        let userTable = "";
        let remarks = "";
        if(this.state.loading === true){
            userTable = <tr><td colSpan="5" className='loading-indicator'><span>Loading...</span></td></tr>;
        }else{
            userTable = filteredStudentsByName.map((item) => {
                if(item.re_exam === null){
                    if(item.grade === '1.0' || item.grade <= '3.0'){
                        remarks = "Passed";
                    }else if(item.grade === 'inc' || item.grade === 'INC' || item.grade >= '3.1'){
                        remarks = "Failed";
                    }else{
                        remarks = "Dropout";
                    }
                }else if(item.re_exam === '1.0' || item.re_exam <= '3.0'){
                    remarks = "Passed";
                }else if(item.re_exam === 'inc' || item.re_exam === 'INC' || item.re_exam >= '3.1'){
                    remarks = "Failed";
                }else{
                    remarks = "Dropout";
                }
                // if(item.grade === "1.0" || item.grade <= "3.0" || item.re_exam === '1.0' || item.re_exam <= '3.0'){
                //     remarks = "Passed";
                // }else if(item.grade >= '4.1' || item.re_exam === 'INC' || item.re_exam === 'inc'){
                //     remarks = "Failed";
                // }else{
                //     remarks = "Dropout";
                // }
                return(
                    <tr key={item.id}>
                        <td>{item.last_name}</td>
                        <td>{item.first_name}</td>
                        <td>{item.subject_code}</td>
                        <td>{item.descriptive_title}</td>
                        <td>{item.semester}</td>
                        <td>{item.year}</td>
                        <td>{item.grade}</td>
                        <td>{item.re_exam}</td>
                        <td style={remarks === "Passed"? {color:'black'} : {color:'red'}}>{remarks}</td>
                            <td>
                            <a href={`/dashboard/edit/${item.id}`}><button className="btn btn-success btn-sm btn-edit"><span className="material-symbols-outlined">edit</span></button></a>
                            </td>
                        <td>
                            <button type="button" className="btn btn-danger btn-sm btn-del"><span className="material-symbols-outlined" onClick={e => this.deleteStudent(e, item.id)}>delete</span></button>
                        </td>
                    </tr>
                );
            });
        }

        // let userMenu = this.state.user.map((item) => {
        //     return(
        //         <span>{item.fullname}</span>
        //     );
        // });

       
        return (
            <div className='wrapper'>
                <nav className="navbar navbar-expand-lg bg-light" id='navbar'>
                <div className="container-fluid">
                    <a className="navbar-brand logo" id='logo' href="/dashboard">Student's Records</a>
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
                                        <li><a href="#" className="dropdown-item">Acount Settings</a></li>
                                        <li><a href="/login" className="dropdown-item" onClick={this.clearUser}>Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    
                <div className='homepage'>
                    <div className='homepage-top'>
                        <p className='title'>MLG COLLEGE OF LEARNING, INC.</p>
                        <p className='sub-title'>Hilongos, Leyte</p>
                    </div>
                    <div className='homepage-top-second'>
                        <p className='sem'>List of the Students</p>
                        {/* <input list="dates" name="date" id="date" className='date' placeholder='Search Batch Year Here' 
                        onChange={(e) => {
                            const yearSearchField = e.target.value.toLocaleLowerCase();

                            this.setState(() => {
                                return { yearSearchField};
                            });

                            }}
                            />
                            <datalist id="dates">
                                <option value="2001-2002" />
                                <option value="2002-2003" />
                                <option value="2003-2004" />
                                <option value="2004-2005" />
                                <option value="2005-2006" />
                            </datalist> */}
                    </div>
                    <div className='main-content'>
                        <input type="search" name="search" id="search" className='search' placeholder='Name or Year Search Here' onChange={(e) => {
                            const nameSearchField = e.target.value.toLocaleLowerCase();
                            this.setState(() => {
                                return { nameSearchField};
                            });

                            }}/>
                        <a href="/dashboard/create"><button type='button' className='btn btn-primary create'><span className="material-symbols-outlined">add</span>Add Student</button></a>
                        {/* <div className='btn-sems-container'>
                            <button type='button' className='btn btn-warning btn-sems btn-sem-1'>Sem 1</button>
                            <button type='button' className='btn btn-warning btn-sems btn-sem-2'>Sem 2</button>
                        </div> */}
                        <div className='table-responsive table-bordered'>
                            <table className="table home-table home-table-width table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Subject Code</th>
                                        <th scope="col">Descriptive Title</th>
                                        <th scope="col">Semester</th>
                                        <th scope="col">Batch Year</th>
                                        <th scope="col">Grade</th>
                                        <th scope="col">Re-Exam</th>
                                        <th scope="col">Final Remarks</th>
                                        <th scope="col">Edit</th>
                                        <th scope='col'>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userTable}
                                </tbody>
                            </table>
                        </div>
                    </div>
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

export default Dashboard;