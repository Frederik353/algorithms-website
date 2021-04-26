import React, { useState, useEffect, useContext } from "react";
import ReactParticles from "react-particles-js";
import particlesConfig from '../../helpers/ParticlesConfig';
import { Footer } from "../../components/footer/footer"
import { NavBar } from "../../components/navbar/navbar"
import { Link } from "react-router-dom"


import "./questions.scss"
// import { useAuth } from "../../helpers/authentication-context"
import { database } from "../../helpers/config";
// import  Question  from "../../helpers/databaseStructure/questions"


const QuestionContext = React.createContext(null);


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
        <div className="spacer"></div>
        <div className="section-skew questions-background">
            <Particles>
                <div className="section-content-wrapper questions-page">
                    <div className="section-content">
                        <div className="questions-info">
                            <h1>Questions</h1>
                            <div className="difficulty-info">
                                <h3>Easy: <span className="difficulty easy large"></span></h3>
                                <h3>Medium: <span className="difficulty medium large"></span></h3>
                                <h3>Hard: <span className="difficulty hard large"></span></h3>
                                <h3>Very Hard: <span className="difficulty very-hard large"></span></h3>
                            </div>
                            <div className="questions-filters">
                                <input type="text" id="search-bar" placeholder="Search question titles"></input>
                            </div>
                        </div>
                        <div className="questions">
                            {/* eslint-disable-next-line */}
                                <a href="#" className="question questions-header" >
                                    {/* <h4>Title</h4> */}
                                    <p>Title</p>
                                    <p>Category</p> 
                                    <p>Acceptance</p>
                                    <p>difficulty</p>
                                </a>
                                <Pagination/>

                        </div>
                    </div>
                </div>
            </Particles>
        </div>
        <div className="questions-footer">
        <Footer/>
        </div>
    </div>
)};






export function Pagination() {
  // Set the initial state
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, set_postsPerPage ] = useState(10);
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
            // var title = await database.ref("questions/").orderByChild("createdAt").limitToFirst(postsPerPage);
            var title = await database.ref("questions/").orderByChild("createdAt");
                title.on("value", (snapshot) => {
                    var result = [];
                    const data = snapshot.val();
                    for (let i in data){
                        result.push(data[i]);
                    }
                    console.log(result)
                    setPosts(result);
                    window.dispatchEvent(new Event("resize")); //trigrer resize event som tvinger particles reflow
            });
            setLoading(false);
        };
        fetchPosts();
    }, [currentPage]);


    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <QuestionContext.Provider value={{ postsPerPage, set_postsPerPage }}>
            <Posts posts={currentPosts} offset={indexOfFirstPost} loading={loading} />
            <PaginationLine
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </QuestionContext.Provider>
    );
}


const PaginationLine = ({ totalPosts, paginate }) => {
    const {postsPerPage, set_postsPerPage } = useContext(QuestionContext);;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    function updatePostsPerPage(e) {
        set_postsPerPage(e.target.value)
    }


    return (
        <nav className="pagination-nav">
            <div className="field">
                <span className="select">
                    Questions per page
                    <select
                        name="difficulty"
                        onChange={ (e) => updatePostsPerPage(e) }
                    >
                        <option value="10" label="10" />
                        <option value="20" label="20" />
                        <option value="30" label="30" />
                        <option value="50" label="50" />
                    </select>
                </span>
            </div>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        {/* eslint-disable-next-line */}
                        <a href="#" className="page-link" onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};


const Posts = ({ posts, loading, offset}) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <>
            {posts.map(post => (
                <Link key={post} className="question" to={{pathname: `/texteditor/${post.title}`, state: {question: post}}}>
                    <p>{offset++}</p>
                    <h4>{post.title}</h4>
                    <p>{post.category}</p>
                    {post.acceptance ? <p>{Math.floor(post.acceptance.cleared / post.acceptance.failed)}%</p> : "0%"}
                    <div className="difficulty large">
                        <span className={post.difficulty}></span>
                    </div>
                </Link>
            ))}
        </>
    );
};



function Particles({ children }) {
    return (
        <div style={{ position: 'relative' }}>
            <ReactParticles
                params={particlesConfig}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                }}
            />
            {children && <div   className="flex-column"  style={{ position: 'relative' }}>{children}</div>}
        </div>
    );
}


