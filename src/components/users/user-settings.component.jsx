import React from "react";

class UserSettings extends React.Component{
    constructor(){
        super();


        this.state = {
            pofile_pic: '',
            fullname: '',
            username: '',
            password: '',

        }

        this.componentDidMountv = async (e) => {
            e.preventDefault();

            let resp = await axios.get('http://students-records-laravel.herokuapp.com/api/dashboard/user-settings', this.state);
            if(resp.data.status === 200){
                console.log(resp.data.response);
            }else{
                console.log(resp.data.response);
            }
        };

        updateUserSettings = async () => {
            user_id = this.props.match.params.id;

            let resp = await axios.put(`http://students-records-laravel/herokuapp.com/api/dashboard/user-settings/${user_id}`)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            })
        };
    }

    render(){

        return(
            <div className="wrapper">
                <form onSubmit="" className='form' >
                <div className="mb-3">
                    <label htmlFor="profile_pic" className="form-label form-lbl">Profile</label>
                    <input type="file" className="form-control" id="profile_pic" name="profile_pic" onChange={e => handle(e)} value={data.profile_pic} placeholder="" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label form-lbl">Fullname</label>
                    <input type="text" className="form-control" id="fullname" name="fullname" onChange={e => handle(e)} value={data.fullname} placeholder="" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label form-lbl">Username</label>
                    <input type="email" className="form-control" id="username" name="username" onChange={e => handle(e)} value={data.username} placeholder="username@gmail.com" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label form-lbl">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={e => handle(e)} value={data.password} placeholder="Password" required/>
                </div>
                <p>Don't have an account yet? <a href="/register">Register</a></p>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            </div>
        );
    }
}

export default UserSettings;