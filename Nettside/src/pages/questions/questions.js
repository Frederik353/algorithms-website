import React, { useState, useEffect, useRef, Fragment } from "react";

import { Footer } from "../../components/footer/footer"
import { NavBar } from "../../components/navbar/navbar"


import "./questions.scss"
import { useAuth } from "../../helpers/authentication-context"
import { database } from "../../helpers/config"









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

// Make the request
// useEffect(() => {
//     const fetchPosts = async () => {
//         setLoading(true);
//             await database.ref("questions").push({
//                         "title": "Merge Sorted Array",
//     "difficulty": "medium",
//     "category": "Arrays",
//     "question": "Given the head of a linked list, return the list after sorting it in ascending order.",
//     "hints": {
//         "hint": "divide-and-conquer"
//         },
//     "funtions": {
//         "python": "def sortList(self, head):",
//         "javascript": "var sortList = function(head) {\n};"
// },
//     "testCases": { 
//         "test": "Input: head = [4,2,1,3]\nOutput: [1,2,3,4]",
//         "test": "Input: head = [-1,5,3,4,0]\nOutput: [-1,0,3,4,5]",
//         },
//     "complexity": "O(n logn) time and O(1) memory/constant space"
//             });

    //         database.ref("").on("value", snapshot => {
    //             let chats = [];
    //             snapshot.forEach((snap) => {
    //                 chats.push(snap.val());
    //             });
    //         })
    //         setLoading(false);
    //     }
    //     fetchPosts();

    // }, []);
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         setLoading(true);
    //         var title = database.ref("questions/-MY6j_OrrxMCVCBbpERY");
    //         title.on('value', (snapshot) => {
    //             const data = snapshot.val();
    //             data = data.json()
    //             setPosts(data.json());
    //         });
    //         setLoading(false);
    //     };

    //     fetchPosts();
    // }, []);
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            await fetch("https://jsonplaceholder.typicode.com/posts")
                .then(response => response.json())
                .then(data => setPosts(data));
            setLoading(false);
        };
        fetchPosts();
    }, []);

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


