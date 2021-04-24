

import React, { useState, useEffect } from "react";
import "./submitQuestion.scss"
import { storage, database } from "../../helpers/config";
import { useAuth } from "../../helpers/authentication-context"
import { BackButton } from "../../components/backButton/backButton"




export function SubmitQuestion() {
    const [categories, set_categories] = useState([]);
    const { currentUser } = useAuth();
    const [data, set_data] = useState({
            uid: currentUser.uid,
            name: currentUser.displayName,
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
    let i = 0;
    function handleInputChange(event) {
        i++;
        let split = event.target.name.split(".");
        let objectCopy = data.[split[0]];
        if (split.length > 1){
            objectCopy.[split[1]] = event.target.value;
            // if (split[1] !== ""){
            // }
            // else {
            //     objectCopy.[i] = event.target.value;
            // }
        }
        else {
            objectCopy = event.target.value
        }

        set_data({ ...data, [split[0]]: objectCopy });
        console.log(event.target.name, event.target.value);
        console.log(data)
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
                    <form action="" class="review-form">
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
                            <h5 type="Space & Time complexity:">
                                <textarea rows="4" type="text" value={data.complexity} onChange={e => handleInputChange(e)}  placeholder="Optimal space and time complexity " name="complexity" required></textarea>
                            </h5>
                            <h5 type="Question:">
                                <textarea rows="25" value={data.question} onChange={e => handleInputChange(e)} placeholder="Write your question here" type="text"  name="question" required></textarea>
                            </h5>
                            <h5 type="Hints:">
                                <textarea rows="10" type="text" value={data.hints} onChange={e => handleInputChange(e)}  placeholder="Do you have any hints" name="hints" required></textarea>
                            </h5>
                            <h5 type="Test Cases:">
                                <textarea rows="10" type="text" value={data.testCases} onChange={e => handleInputChange(e)}  placeholder="write youre tests here" name="testCases" required></textarea>
                            </h5>
                            <h3>Start functions</h3>
                            <h5 type="Javascript:">
                                <textarea rows="10" type="text" value={data.functions.javascript} onChange={e => handleInputChange(e)}  placeholder="Javascript function" name="functions.javascript" required></textarea>
                            </h5>
                            <h5 type="C++:">
                                <textarea rows="10" type="text" value={data.functions.c_pp} onChange={e => handleInputChange(e)}  placeholder="C++ function" name="functions.c_pp" required></textarea>
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












