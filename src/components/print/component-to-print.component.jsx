// Using a class component, everything works without issue
import React from "react";
import axios from "axios";
import '../styles/style.scss';

class ComponentToPrint extends React.PureComponent {
    constructor(props){
        super(props);

        this.state = {
            student: [],
            loading: true,
        }
    }

    async componentDidMount(){
        // let student_id = this.props.match.params.id;
       let last_name = window.location.pathname.split("/").pop();
        const resp = await axios.get(`https://students-records-laravel.herokuapp.com/api/dashboard/print/${last_name}`);
        let userInfo = JSON.parse(localStorage.getItem('user'));
        if(!userInfo || userInfo === null){
            window.location.href = '/error';
            console.log('You are not Authrozied');
        }else{
            const sortYear = resp.data.student.sort((a, b) => a.year.localeCompare(b.year));
            if(resp.data.status === 200){
                this.setState({
                    student: sortYear,
                    loading: false,
                });
            }
        }
        console.log(resp.data.response);
    }
    render() {
        let userTable = "";
        let remarks = "";
        if(this.state.loading === true){
            userTable = <tr><td colSpan="5" className='loading-indicator'><h3>Loading...</h3></td></tr>;
        }else{
        userTable = this.state.student.filter((item) => {
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
            return(
                <tr key={item.id}>
                    <td>{item.last_name}</td>
                    <td>{item.first_name}</td>
                    <td>{item.subject_code}</td>
                    <td>{item.descriptive_title}</td>
                    <td>{item.semester}</td>
                    <td>{item.year}</td>
                    <td style={item.grade === 'INC' || item.grade === 'DROPOUT'? {color: 'yellow'} : {color: 'black'}} className="table-grade">{item.grade}</td>
                    <td style={item.re_exam === 'INC'? {color: 'yellow'} : {color: 'black'}} className="table-re_exam">{item.re_exam}</td>
                    <td style={remarks === "Passed"? {color:'black'} : {color:'red'}}>{remarks}</td>
                </tr>
            );
        });
    }
      return (
        <div className="print-wrapper table-responsive table-bordered">
            <div className="print-title">
                <h3>Students Records</h3>
            </div>
            <table className="table home-table home-table-width">
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
                        </tr>
                    </thead>
                    <tbody>
                        {userTable}
                    </tbody>
            </table>
        </div>
      );
    }
  }

  export default ComponentToPrint;