import React, { useState, useEffect, useRef, Fragment } from "react";

import { Footer } from "../../components/footer/footer"
import { NavBar } from "../../components/navbar/navbar"


import "./questions.scss"
import { useAuth } from "../../helpers/authentication-context"
import { database } from "../../helpers/config";
import  Question  from "../../helpers/databaseStructure/questions"

export function Questions(){
    return(
    <div className="wrapper">
        <div className="section-skew questions-navbar">
            <div className="section-content-wrapper">
                <div className="section-content questions-navbar-content">
                    <NavBar />
                </div>
            </div>
        </div>
        <div className="temp flex-column">
            <h1>Questions</h1>
            {/* <div className="questions"> */}
                <Pagination/>


                {/* <div className="question">
                    <div class="info-box">
                        <div class="info">
                            <span>Difficulty:</span>
                            <span class="difficulty easy"></span>
                        </div>
                    </div>
                </div> */}
            {/* </div> */}
            </div>
        <Footer />
    </div>
)};






export function Pagination() {
  // Set the initial state
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    // const { currentUser, logout } = useAuth();

    // fill test db
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         setLoading(true);
    //         for(let i = 0; i < 50; i++) {
    //             // console.log(i);
    //             database.ref("questions").push(Question);
    //         }
    //         setLoading(false);
    //         };
    //     fetchPosts();
    // }, []);
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            // var title = await database.ref("questions").orderByChild("difficulty").equalTo("medium");
            var title = await database.ref("questions");
            title.on('value', (snapshot) => {
                const data = () => {
                    const data = snapshot.val();
                    // var result = [];
                        // console.log(i)
                    for(let i = 0; i < 50; i++) {
                        console.log(i);
                        // database.ref("questions").push(Question);
                    }
                
                    setPosts(data);
                };
            });
            setLoading(false);
        };
        fetchPosts();
    }, []);
    // seEffect(() => {
    //     const fetchPosts = async () => {
    //         setLoading(true);
    //         await fetch("https://jsonplaceholder.typicode.com/posts")
    //             .then(response => response.json())
    //             .then(data => console.log(data));
    //         setLoading(false);
    //     };
    //     fetchPosts();
    // }, []);u

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="dark-text">
            <Posts posts={currentPosts} loading={loading} />
            <PaginationLine
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </div>
    );
}


const PaginationLine = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a href="#" className="page-link dark-text" onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};


const Posts = ({ posts, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="questions">
            {posts.map(post => (
                <div key={post} className="question" >
                    <h4>{post.title}</h4>
                    <h4>{post.category}</h4>
                    <p>{post.difficulty}</p>
                </div>
            ))}
        </div>
    );
};


