
import "./reviews.scss"
import React, { useContext, useEffect, useState } from "react";
import { EditorContext } from "../../pages/texteditor/texteditor"
import { database } from "../../helpers/config";
import { storage } from "../../helpers/config";



export function Reviews() {
    // const { settings, set_settings } = useContext(EditorContext);
    const [loading, setLoading] = useState(false);
    const [reviewsArray, setReviewsArray] = useState([]);

    useEffect(() => {
        async function fetchReviews(){
            setLoading(true)
            var title = await database.ref("reviews/");
                    title.on("value", (snapshot) => {
                        const data = snapshot.val();
                        let result = [];
                        for (let i in data){
                            result.push(data[i]);
                        }
                        setReviewsArray(result);
                });
            setLoading(false)
        }
        fetchReviews();
    },[]);

    return (
        <div className="review-wrap">
            <Review reviews={reviewsArray} loading={loading} />
        </div>
    );
}


const Review = ({reviews, loading}) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // const invertClass = (reviews.invert ? "invert" : "lol");

    return(
        <>
            {reviews.map(review => (
                <div className="reviews-card">
                    <img className="profile-picture" src={review.photoURL} alt="profile picture"/>
                    <h3 className="name">{review.name}</h3>
                    <div className="role">
                        <h4 className="job-status">{review.jobStatus}</h4>
                        <img className={`institution-logo ${(review.invert ? "invert" : "lol")}`} src={review.logo} alt="company logo"/>
                    </div>
                    <div className="review-content">
                        <p>{review.text}</p>
                    </div>
                </div>
            ))}
        </>
    );
}