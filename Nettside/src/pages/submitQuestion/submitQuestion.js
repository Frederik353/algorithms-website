

import React, { useState, useEffect } from "react";
import "./submitQuestion.scss"
import { useAuth } from "../../helpers/authentication-context"
import { BackButton } from "../../components/backButton/backButton"
import { database } from "../../helpers/config";



export function SubmitQuestion() {
    const [categories, set_categories] = useState([]);
    const { currentUser } = useAuth();
    const [hints, set_hints] = useState()
    const [testCases, set_testCases] = useState()
    const [data, set_data] = useState({
            uid: currentUser.uid,
            name: currentUser.displayName,
            createdAt: new Date().getTime(),
            acceptance: {
                cleared: Math.floor(Math.random() * 3000),
                failed: Math.floor(Math.random() * 2000),
            },
            functions: {
                python: "",
                c_pp: "",
                javascript: "",
                golang: "",
                java: "",
            },
            // testCases: {},
            // hints: {},
        });

    // useEffect(() => {
    //     set_data({
            
    //     })
    // },[]);


    useEffect(() => {
        var Categories = database.ref("categories/");
            Categories.on("value", (snapshot) => {
                var result = [];
                const data = snapshot.val();
                for (let i in data){
                    result.push(data[i]);
                }
                set_categories(result);
        });
    }, []);
    
    function handleInputChange(event) {
        let split = event.target.name.split(".");
        if (event.target.name === "testCases" || event.target.name === "hints" ){
            if (event.target.name === "testCases"){
                set_testCases(event.target.value);
            }
            else if (event.target.name === "hints"){
                set_hints((event.target.value));
            }
            let object = event.target.value.split("\"\"\"");
            for (let i in object) {
                object[i] = object[i].replace(/^\n+|\n+$/g, '');
            }
            object = Object.assign({}, object); 
            set_data({ ...data, [split[0]]: object });
            console.log(data)
            return;
        }
        let objectCopy = data.[split[0]];
        if (split.length > 1){
            objectCopy.[split[1]] = event.target.value;
        }
        else {
            objectCopy = event.target.value
        }

        set_data({ ...data, [split[0]]: objectCopy });
    }


    const handleUpload = (e) => {
        e.preventDefault();
        var submitTo = database.ref("/questions");
        submitTo.push(data);
    }


    return (
        <div className="writeReview-wrapper">
            <div className="login-wrapper">
                <div className="form-container">
                    <form action="" className="review-form">
                        <h2>Create a question</h2>
                        <div className="input-wrapper">
                            <h5 type="Title:">
                                <input value={data.title} onChange={e => handleInputChange(e)} placeholder="Question title" type="text"  name="title" maxlength="30" required ></input>
                            </h5>
                            <h5 type="Category:">
                                <div className="field">
                                    <span className="select">
                                        <select
                                            name="category"
                                            onChange={ handleInputChange }
                                        >
                                            {categories.map(category => (
                                                <option value={ category } label={ category }/>
                                            ))}
                                        </select>
                                    </span>
                                </div>
                            </h5>
                            <h5 type="Difficulty:">
                                <div className="field">
                                    <span className="select">
                                        <select
                                            name="difficulty"
                                            onChange={ handleInputChange }
                                        >
                                            <option value="easy" label="Easy" />
                                            <option value="medium" label="Medium" />
                                            <option value="hard" label="Hard" />
                                            <option value="very-hard" label="Very hard" />
                                        </select>
                                    </span>
                                </div>
                            </h5>
                            <h5 type="Question:">
                                <textarea rows="25" value={data.question} onChange={e => handleInputChange(e)} placeholder="Write your question here" type="text"  name="question" required></textarea>
                            </h5>
                            <h5 type="Space & Time complexity:">
                                <textarea rows="4" type="text" value={data.complexity} onChange={e => handleInputChange(e)}  placeholder="Optimal space and time complexity " name="complexity" required></textarea>
                            </h5>
                            <h5 type="Hints:">
                                <textarea rows="10" type="text" value={hints} onChange={e => handleInputChange(e)}  placeholder="If you have multiple hints separate them with three Quotation marks &#13;&#13;For example:&#13;&#13;hint 1&#13;&quot;&quot;&quot;&#13;Hint 2&#13;&quot;&quot;&quot;&#13;Hint 3" name="hints" required></textarea>
                            </h5>
                            <h5 type="Test Cases:">
                                <textarea rows="10" type="text" value={testCases} onChange={e => handleInputChange(e)}  placeholder="If you have multiple testCases separate them with three Quotation marks &#13;&#13;For example:&#13;&#13;Testcase 1&#13;&quot;&quot;&quot;&#13;Testcase 2&#13;&quot;&quot;&quot;&#13;Testcase 3" name="testCases" required></textarea>
                            </h5>
                            <h3>Start functions</h3>
                            {/* eslint-disable-next-line */}
                            <h5 type="Javascript:">
                                <textarea rows="10" type="text" value={data.functions.javascript} onChange={e => handleInputChange(e)}  placeholder="Javascript function" name="functions.javascript" required></textarea>
                            </h5>
                            <h5 type="C++:">
                                <textarea rows="10" type="text" value={data.functions.c_cpp} onChange={e => handleInputChange(e)}  placeholder="C++ function" name="functions.c_cpp" required></textarea>
                            </h5>
                            <h5 type="Python:">
                                <textarea rows="10" type="text" value={data.functions.python} onChange={e => handleInputChange(e)}  placeholder="Python function" name="functions.python" required></textarea>
                            </h5>
                            <h5 type="Golang:">
                                <textarea rows="10" type="text" value={data.functions.golang} onChange={e => handleInputChange(e)}  placeholder="Golang function" name="functions.golang" required></textarea>
                            </h5>
                            <h5 type="Java:">
                                <textarea rows="10" type="text" value={data.functions.java} onChange={e => handleInputChange(e)}  placeholder="Java function" name="functions.java" required></textarea>
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












