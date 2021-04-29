
import React from 'react';
import { NavBar } from '../../components/navbar/navbar.js';
import "./landing_page.scss";
import { GradientCanvas } from "../../components/gradient_canvas/gradient_canvas";
import { Link } from 'react-router-dom';
import { Texteditor } from "../texteditor/texteditor"
import { Footer } from "../../components/footer/footer"
import { Reviews } from "../../components/reviews/reviews"

import Upload from './svg/006-upload.svg';
import Server from "./svg/038-server.svg";

// languages
import Python from './logos/python.svg';
import Javascript from './logos/javascript.svg';
import Go from './logos/go.svg';
import Java from './logos/java.svg';
import Typescript from './logos/typescript.svg';
import Cpp from './logos/c++.svg';
import C from './logos/c.svg';

// photoshop image
import Photoshop from "./photoshop-bilde.gif";

// header image
import ReactLogo from "./react.png";

// concepts
import Graph from './concepts/graph.svg';
import LinkedList from './concepts/linked-list.svg';
import Array from './concepts/array.svg';
import Matrix from './concepts/matrix.svg';
import Recursion from './concepts/recursion.svg';
import Search from './concepts/search.svg';
import Sort from './concepts/sort.svg';
import Stack from './concepts/stack.svg';
import Tree from './concepts/tree.svg';

import DynamicProgramming from './concepts/dynamic programming.svg';
import HashTable from './concepts/hash table.svg';
import Queue from './concepts/queue.svg';



export function Landing_page(){
    return(
    <div className="wrapper">
        <div className="section-skew header">
            <div className="section-content-wrapper">

                <div className="section-content">

                    <NavBar />
                    <div className="header">
                        <div className="header-wrap">
                            <h1 className="Hero_Header" >
                                A New Way to Learn Programming
                            </h1>
                            <GradientCanvas/>
                            <div className="Hero_Header Hero_Header_overlay HomepageHeroHeader__title--burn" >
                                A New Way to Learn Programming
                            </div>
                            <div className="Hero_Header Hero_Header_overlay">
                                A New Way to Learn Programming
                            </div>
                            <p className="landing-page-paragraph">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus et inventore dolorum aliquam fuga, voluptates odit incidunt nostrum fugiat, sit tempora corrupti numquam? Expedita facilis cupiditate vel molestiae delectus fugit?
                            </p>
                            <Link className="landingpage-button" to="/questions">Questions ➜</Link>
                        </div>
                        <img src={ ReactLogo } alt=""></img>
                    </div>
                </div>
            </div>
        </div>
        <div className="section-skew ">
            <div className="section-content-wrapper">
                <div className="section-content">
                    <div className="secondary-color-section cross-color-border section-two">
                        <img src={ Photoshop } alt=""></img>
                        <div>
                            <h1>Lorem Ipsum</h1>
                            <p className="landing-page-paragraph">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci dolorum fugit dignissimos reprehenderit quis nisi aut corrupti alias aperiam facere eos reiciendis vitae temporibus, ab blanditiis quasi! Autem, tempore unde.
                            </p>
                            <Link className="landingpage-button" to="/questions">Questions ➜</Link>
                        </div>

                        <div className="box">
                            <img src={ Upload } alt=""></img>
                            <h2>Lorem, ipsum dolor</h2>
                            <p className="landing-page-paragraph">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, repellat. Mollitia, corporis cupiditate qui illo voluptatibus sed delectus voluptatem incidunt omnis aspernatur beatae nesciunt est dolore eius obcaecati nihil dolor consequuntur veritatis provident nemo dicta quidem enim laboriosam! Quibusdam quidem quae, obcaecati iusto mollitia ducimus?</p>
                        </div>
                        <div className="box">
                            <img src={ Server } alt=""></img>
                            <h2>Lorem, ipsum dolor</h2>
                            <p className="landing-page-paragraph">  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, cum laudantium? Tempore temporibus provident minima, culpa similique optio at perferendis, autem totam enim ducimus. Tempora illum vitae temporibus iusto deserunt.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="section-three flex-column">
            <div className="box">
                <h1>Suported languages</h1>
                <p  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea excepturi tenetur amet iusto, cumque autem inventore non error consectetur repudiandae? Quam sint maiores magni obcaecati voluptatibus, veritatis eveniet qui tenetur esse.</p>
                <Link className="landingpage-button" to="/questions">Questions ➜</Link>
            </div>
            <div className="boxgrid">
                <div className="box">
                    <img src={ Python } alt=""></img>
                    <h2>Python</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="box">
                    <img src={ Javascript } alt=""></img>
                    <h2>Javascript</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="box">
                    <img src={ Go } alt=""></img>
                    <h2>Go</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="box">
                    <img src={ Java } alt=""></img>
                    <h2>Java</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="box">
                    <img src={ Typescript } alt=""></img>
                    <h2>Typescript</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="box">
                    <img src={ Cpp } alt=""></img>
                    <h2>C++</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="box">
                    <img src={ C } alt=""></img>
                    <h2>C</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
        </div>
        <div className="section-skew ">
            <div className="section-content-wrapper">
                <div className="section-content">
                    <div className="secondary-color-section section-four flex-column">
                        <h1>Concepts</h1>


                        <div className="boxgrid">
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ Graph } alt=""></img>
                                            <h2>Graphs</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Graphs</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ Tree } alt=""></img>
                                            <h2>Tree's</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Tree's</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ LinkedList } alt=""></img>
                                            <h2>Linked List's</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Linked List's</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ Array } alt=""></img>
                                            <h2>Arrays</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Arrays</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ Recursion } alt=""></img>
                                            <h2>Recursion</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Recursion</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ DynamicProgramming } alt=""></img>
                                            <h2>Dynamic Programming</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Dynamic Programming</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ HashTable } alt=""></img>
                                            <h2>Hash table</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>HashTable</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ Stack } alt=""></img>
                                            <h2>Stacks</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Stacks</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ Queue } alt=""></img>
                                            <h2>Queues</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Queues</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ Matrix } alt=""></img>
                                            <h2>Matrix</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Matrix</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ Sort } alt=""></img>
                                            <h2>Sorting</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Sorting</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip">
                                <div className="test">
                                    <div className="front">
                                        <div className="box">
                                            <img src={ Search } alt=""></img>
                                            <h2>Searching</h2>
                                        </div>
                                    </div>
                                    <div className="back ">
                                        <div className="box">
                                            <h2>Tree's</h2>
                                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="section-five flex-column">
            <h1>? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? </h1>
        </div>
        <div className="section-skew ">
            <div className="section-content-wrapper texteditor">
                <div className="section-content">
                    <div className="secondary-color-section section-six flex-column">
                        <Texteditor randomQuestion={true}></Texteditor>
                    </div>
                </div>
            </div>
        </div>
        <div className="section-seven flex-column">
            <Reviews />
        </div>
        <Footer></Footer>
    </div>
)};

