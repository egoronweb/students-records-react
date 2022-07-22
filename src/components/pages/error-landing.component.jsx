import React from "react";
import '../styles/style.scss';
function Landing()  {

    return(
        <div className="error-page">
            <img src="https://th.bing.com/th/id/OIP.pEdaxciQTI9s1DHlMqaLVgHaHa?pid=ImgDet&rs=1" alt="" />
            <h1>401 Error Code. <br /> You are not authorized to access. <br /> Please proceed in proper procedure.</h1>
            <a href="/login" className="btn btn-primary"><span class="material-symbols-outlined">arrow_back</span>Go to Login Page</a>
        </div>
    );
}

export default Landing;