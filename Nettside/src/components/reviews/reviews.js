
import "./reviews.scss"
import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
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
                        result.push({
                                    "jobStatus" : "Role",
                                    "logo" : "",
                                    "name" : "You",
                                    "photoURL" : "https://firebasestorage.googleapis.com/v0/b/it-prosjekt-2-d23c1.appspot.com/o/images%2Favatar-icon.png?alt=media&token=a4badf05-b8ed-4e36-93bd-2f2ecf838e06",
                                    "text" : "Your success story",
                                    "link" : "/write-review",
                                    "uid" : "JYgt39LVKSgJVi62CYIhtu7pf162"
                                })
                        setReviewsArray(result);
                });
            setLoading(false)
        }
        fetchReviews();
    },[]);

    return (
        <div className="review-wrap">
            <h1>Reviews</h1>
            <Review reviews={reviewsArray} loading={loading} />
        
        </div>
    );
}


const Review = ({reviews, loading}) => {
    const [value, setValue] = useState(0);
    console.log(reviews)
    // const invertClass = (reviews.invert ? "invert" : "lol");
    function onChange(value) {
        if (value < (reviews.length / 3)){
            setValue(value);
        }
    }
    
    if (loading) {
        return <h2>Loading...</h2>;
    }
    else{
        return(
            <>
                <Carousel
                value={value}
            onChange={onChange}
            arrows
            infinite
            slidesPerPage={3}
                >
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
                                {review.link ? <Link exact to={review.link}>Submit review</Link> : ""}
                                
                            </div>
                        </div>
                    ))}
                </Carousel>
                <Dots value={value} onChange={onChange} number={(reviews.length / 3)} />
            </>
        );
    }
}


    //         {/* <div style={{ width: "18rem" }}>
    //   <img variant="top" src="http://placehold.jp/24/373940/b2aea6/268x180.png" />
    //   <div>
    //     <div>div Title</div>
    //     <div>
    //       Some quick example text to build on the div title and make up the
    //       bulk of the div's content.
    //     </div>
    //     <button >Go somewhere</button>
    //   </div>
    // </div> */}
