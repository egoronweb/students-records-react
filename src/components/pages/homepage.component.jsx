
import React from 'react';
import axios from 'axios';

import '../styles/styles.css';
class Homepage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            students: [],
            loading: true,
            nameSearchField: '',
        }
    }



    async componentDidMount(){
        const resp = await axios.get('http://127.0.0.1:8000/api/homepage');
        if(resp.data.status === 200){
            this.setState({
                students: resp.data.students,
                loading: false,
            });
        }
    }


   

    render(){

        const filteredStudents = this.state.students.filter((student) => {
            return student.fullname.toLocaleLowerCase().includes(this.state.nameSearchField);
        });


        let userTable = "";
        let remarks = "";
        if(this.state.loading === true){
            userTable = <tr><td colSpan="5"><h2>Loading please wait...</h2></td></tr>;
        }else{
            userTable = filteredStudents.map((item) => {
                if(item.final_grade === "1.0" || item.final_grade <= "3.0"){
                    remarks = "Passed";
                }else{
                    remarks = "Failed";
                }
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.fullname}</td>
                        <td>{item.semester}</td>
                        <td>{item.year}</td>
                        <td>{item.final_grade}</td>
                        <td style={item.final_grade === "1.0" || item.final_grade <= "3.0" ? {color:'black'}:{color:'red'}}>{remarks}</td>
                        <td>
                            <button className="btn btn-success btn-sm btn-edit"><a href={`/edit/${item.id}`}>Edit</a></button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger btn-sm btn-del" onClick={e => this.deleteStudent(e, item.id)}>Delete</button>
                        </td>
                    </tr>
                );
            });
        }



        return (
            <div className='wrapper'>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Home</a>
                       <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                <a className="nav-link active" href="/create">Create</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" href="/login">Logout</a>
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
                        <p className='sem'>Semester 1</p>
                        <input list="dates" name="date" id="date" placeholder='Search Batch Year Here'/>
                            <datalist id="dates">
                                <option value="2001-2002" />
                                <option value="2002-2003" />
                                <option value="2003-2004" />
                                <option value="2004-2005" />
                                <option value="2005-2006" />
                            </datalist>
                    </div>
                    <div className='maint-content'>
                        <input type="search" name="search" id="search" placeholder='Search Name Here' onChange={(e) => {
                            const nameSearchField = e.target.value.toLocaleLowerCase();

                            this.setState(() => {
                                return { nameSearchField};
                            });

                            }}/>
                        <a href="/create"><button type='' className='btn btn-primary create'>Create</button></a>
                        <table className="table home-table home-table-width">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Semester</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Final Grade</th>
                                    <th scope="col">Remarks</th>
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
        );
    }
}

export default Homepage;