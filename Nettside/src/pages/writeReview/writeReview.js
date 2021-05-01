import React, { useState, useEffect } from "react";
import "./writeReview.scss"
import { storage, database } from "../../helpers/config";
import { useAuth } from "../../helpers/authentication-context"
import { BackButton } from "../../components/backButton/backButton"



export function WriteReview() {
    const [data, set_data] = useState({});
    const { currentUser } = useAuth();

    useEffect(() => {
        set_data({
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            name: currentUser.displayName
        })
    // eslint-disable-next-line
    },[]);

    function handleInputChange(event) {
        set_data({ ...data, [event.target.name]: event.target.value })
        // console.log(event.target.name, event.target.value)
    }

    const [images, setImages] = useState(null);
    // const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChange = e => {
        if (e.target.files[0]) {
            setImages({...images, [e.target.name]:  e.target.files[0]});
            console.log(images)
        }
    };


    useEffect(() => {
        var submitTo = database.ref("/reviews");
        submitTo.push(data);
    // eslint-disable-next-line
    }, [data.logo]);

    const handleUpload = (e) => {
        e.preventDefault();
        let urls = [];
        for (let i in images){
            // imageArray.push(images[i]);
            const uploadTo = storage.ref(`review-images/${images[i].name}`).put(images[i]);
            uploadTo.on("state_changed", (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                },
                storage.ref("review-images").child(images[i].name).getDownloadURL()
                .then(url => {
                    urls.push(url)
                    console.log(urls[0], urls[1])
                    set_data({ ...data, photoURL: urls[0], logo: urls[1]})
                })
            );
        }
    }


    return (
        <div className="writeReview-wrapper">
            <div className="login-wrapper">
                <div className="form-container">
                    <form action="" className="review-form">
                        <h2>Submit a review</h2>
                        <div className="input-wrapper">
                            <h5 type="Job status:">
                                <input value={data.jobStatus} onChange={e => handleInputChange(e)} placeholder="Job status" type="text"  name="jobStatus" maxlength="30" required ></input>
                            </h5>
                            <h5 type="Your success story:">
                                <textarea rows="15" type="text" value={data.text} onChange={e => handleInputChange(e)}  placeholder="Tell us about your success story" name="text" required></textarea>
                            </h5>

                            <h5 type="If you want anather profile picture:">
                                <input type="file" onChange={ handleChange } name="photoURL" />
                            </h5>
                            <h5 type="The logo of your company or institution :">
                                <input type="file" onChange={ handleChange } name="logo" required />
                            </h5>
                            <progress value={progress} max="100" />
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