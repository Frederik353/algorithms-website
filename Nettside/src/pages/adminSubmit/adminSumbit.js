
import React, { useState} from "react";
import { database } from "../../helpers/config";
import { BackButton } from "../../components/backButton/backButton";




export function AdminSubmit() {
    const [data, set_data] = useState({});


    function handleInputChange(event) {
        set_data({ ...data, [event.target.name]: event.target.value });
    }


    const handleUpload = (e) => {
        e.preventDefault();
        var submitTo = database.ref(data.to);
        submitTo.push(data.value);
    }


    return (
        <div className="writeReview-wrapper">
            <div className="login-wrapper">
                <div className="form-container">
                        <form className="review-form">
                            <h2>Submit to db</h2>
                            <div className="input-wrapper">
                                <h5 type="To:">
                                    <input value={data.to} onChange={e => handleInputChange(e)} placeholder="Where to submit to" type="text"  name="to" required />
                                </h5>
                                <h5 type="Value:">
                                    <input value={data.value} onChange={e => handleInputChange(e)} placeholder="Value to submit" type="text"  name="value" required />
                                </h5>
                            </div>
                            <div className="form-nav">
                                <button className="login-button submit-button" onClick={ e => handleUpload(e) }>Submit</button>
                                <BackButton className="back-button">❮ Back</BackButton>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    );
}












