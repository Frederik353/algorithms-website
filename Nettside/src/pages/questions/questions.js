
import { Footer } from "../../components/footer/footer"
import { NavBar } from "../../components/navbar/navbar"


import "./questions.scss"


import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { data } from "./data-test";










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
            {/* <Pagination
                data={data}
                limit={5}
                offset={0}
                position="top"
                showInfo={true}
            /> */}



             <div className="questions">
                <div className="question">
                    <div class="info-box">
                        <div class="info">
                            <span>Difficulty:</span>
                            <span class="difficulty easy"></span>
                        </div>
                    </div>
                </div>
                <div className="question">
                    <div class="info-box">
                        <div class="info">
                            <span>Difficulty:</span>
                            <span class="difficulty easy"></span>
                        </div>
                    </div>
                </div>
                <div className="question">
                    <div class="info-box">
                        <div class="info">
                            <span>Difficulty:</span>
                            <span class="difficulty easy"></span>
                        </div>
                    </div>
                </div>
                <div className="question">
                    <div class="info-box">
                        <div class="info">
                            <span>Difficulty:</span>
                            <span class="difficulty easy"></span>
                        </div>
                    </div>
                </div>
                <div className="question">
                    <div class="info-box">
                        <div class="info">
                            <span>Difficulty:</span>
                            <span class="difficulty easy"></span>
                        </div>
                    </div>
                </div>
                <div className="question">
                    <div class="info-box">
                        <div class="info">
                            <span>Difficulty:</span>
                            <span class="difficulty easy"></span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <Footer />
    </div>
)};










// function Pagination(props) {
//     const intialstate = {
//         data: null,
//         limit: props.limit ? props.limit : 6,
//         offset: props.offset ? props.offset : 0,
//         pageCount: 0
//     };

//     const [QuestionSettings, set_QuestionSettings] = useState(intialstate);

//     useEffect(() => {
//         let foo;
//         if (props.data.isArray) {
//             foo = props.data;
//         } else if (typeof props.data === "object") {
//             foo = Object.keys(props.data);
//         }
//         console.log(props);
//         set_QuestionSettings({ ...QuestionSettings, data: foo });
//         set_QuestionSettings({ ...QuestionSettings, pageCount: Math.ceil(data.length / QuestionSettings.limit)});
//     }, []);


//     function  offsetHandler(args) {
//         set_QuestionSettings(prevState => {
//             let offset;

//             if (args.replace) {
//                 offset = args.offset;
//             } else {
//                 offset = prevState.offset += args.offset * prevState.limit;
//             }

//             if (prevState.offset < 0) {
//                 offset = prevState.limit * prevState.pageCount - prevState.limit;
//             }
//             if (prevState.offset >= prevState.limit * prevState.pageCount) {
//                 offset = 0;
//             }
//             return {
//                 offset
//             };
//         });
//     }

//     let data = QuestionSettings.data;

//     let limit = QuestionSettings.limit;
//     let offset = QuestionSettings.offset;
//     console.log(QuestionSettings);
//     console.log(props);
//     let placeholder = data.filter((key, index) => {
//         return index >= offset && index < offset + limit;
//     });

//     let itemList = placeholder.map(key => {
//         return <li key={key}>{props.data[key].name}</li>;
//     });

//     let info = () => {
//         if (!props.showInfo) return;
//         return (
//             <div>
//                 <h4>{props.data.length} Items</h4>
//                 <h4>{QuestionSettings.limit} Limit</h4>
//                 <h4>{QuestionSettings.offset} Offset</h4>
//             </div>
//         );
//     };

//     let paginationControl = () => {
//         return (
//             <PaginationControl
//                 data={props.data}
//                 limit={QuestionSettings.limit}
//                 offset={QuestionSettings.offset}
//                 pageCount={QuestionSettings.pageCount}
//                 nextButton={true}
//                 prevButton={true}
//                 offsetHandler={QuestionSettings.bind(QuestionSettings)}
//             />
//         );
//     };

//     let top = () => {
//         if (props.position === "top" || props.position === "top-bottom")
//             return paginationControl();
//     };

//     let bottom = () => {
//         if (
//             props.position === "bottom" ||
//             props.position === "top-bottom"
//         )
//             return paginationControl();
//     };

//     return (
//         <div>
//             {info()}
//             {top()}
//             <ul>{itemList}</ul>
//             {bottom()}
//         </div>
//     );
// }









// function PaginationControl(props) {
//     function offsetHandler(args) {
//         props.offsetHandler(args);
//     };

//         let data;
//         if (props.data.isArray) {
//             data = props.data;
//         } else if (typeof props.data === "object") {
//             data = Object.keys(props.data);
//         }

//         let limit = props.limit;

//         let nav = dir => {
//             if (props.nextButton)
//                 return (
//                     <li
//                         onClick={this.offsetHandler.bind(this, {
//                             offset: dir,
//                             replace: false
//                         })}
//                         className="pagination-link"
//                     >
//                         <span>{dir > 0 ? "Next" : "Prev"}</span>
//                     </li>
//                 );
//         };

//     let pageCount = props.pageCount;
//     let linkArray = [];
//     let link = 0;
//     for (let i = 0; i < pageCount; i++) {
//         linkArray.push(link);
//         link += limit;
//     }
//     let links = linkArray.map((item, index) => {
//         return (
//             <li
//                 key={item}
//                 onClick={this.offsetHandler.bind(this, {
//                     offset: item,
//                     replace: true
//                 })}
//                 className={`${
//                     item == props.offset ? "active" : ""
//                 }  pagination-link`}
//             >
//                 {index + 1}
//             </li>
//         );
//     });

//     return (
//         <div>
//             <ul className="pagination-links-container">
//                 {nav(-1)}
//                 {links}
//                 {nav(1)}
//             </ul>
//         </div>
//     );
// }




































