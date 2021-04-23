import React, { useState, useEffect } from "react";
import "./writeReview.scss"
import { database } from "../../helpers/config";
import { useAuth } from "../../helpers/authentication-context"





export function WriteReview() {
    const [data, set_data] = useState({});
    const { currentUser } = useAuth();
    
    useEffect(() => {
        set_data({
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            name: currentUser.displayName
        })
    },[]);

    function handleInputChange(event) {
        set_data({ ...data, [event.target.name]: event.target.value })
        console.log(event.target.name, event.target.value)
    }

    function Upload(){
        // send to db
    }


    return (
        <div className="writeReview-wrapper">
            <div className="login-wrapper">
                <div className="form-container">
                    <form action="" class="contact-form">
                        <h2>Submit a review</h2>
                        <p type="Job status:"><input value={data.jobStatus} onChange={e => handleInputChange(e)} placeholder="Job status" type="text" name="jobStatus" required ></input></p>
                        <p type="Your success story:"><textarea rows="10" type="text" value={data.jobStatus} onChange={e => handleInputChange(e)} placeholder="Tell us about your success story" name="jobStatus" required></textarea></p>
                        <button className="login-button"onClick={ Upload }>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}