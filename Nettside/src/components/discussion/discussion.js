import "./discussion.scss"

import React, { useContext, useEffect, useRef, useCollectionData, useState } from "react";
import { EditorContext} from "../../pages/texteditor/texteditor"
import { database } from "../../helpers/config";
import { useAuth } from "../../helpers/authentication-context"


// const DiscussionState =  {user: auth().currentUser,
    
// }


// const [DiscussionState, set_DiscussionState] = useState(DiscussionState)
// const [loading, setLoading] = useState([false]);

// setLoading(true);



export function Discussion() {
    const { settings} = useContext(EditorContext);
    const scrollToRef = useRef();
    const { currentUser } = useAuth();
    const messagesRef = database.ref("questions/" + settings.currentQuestionURl + "/posts");
    const query = messagesRef.orderByChild('createdAt');
    const [formValue, setFormValue] = useState('');

    let messages = [];
    for (let i in settings.currentQuestion.posts){
        messages.push(settings.currentQuestion.posts[i])
    }

//     useEffect(() => {
//         messages = foo()
//     }, [])

//     function foo() {
//         messagesRef.on("value", (snapshot) => {
//             const data = snapshot.val();
//             let messages = [];
//             for (let i in data){
//                 messages.push(data[i]);
//             }
//             // console.log(messages)
//             return messages;
//         });
//     }

    const sendMessage = async (e) => {
        e.preventDefault();
        const uid = currentUser.uid;
        const photoURL  = currentUser.photoURL;
        await messagesRef.push({
            text: formValue,
            createdAt: new Date().getTime(),
            uid,
            photoURL
        })
        setFormValue('');
        // scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div className="messages">
                {messages && messages.map(msg => <Posts key={msg.id} message={msg} />)}
                {/* <Posts message={messages[0]} /> */}
                <span ref={scrollToRef}></span>
            </div>
            <form classname="chatform" onSubmit={(e) => sendMessage(e)}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
                <button type="submit" disabled={!formValue}>🚀</button>
            </form>
        </>
    )
}



function Posts(props) {
    // console.log(props.message)
    const { createdAt ,photoURL, text, uid,} = props.message;
    const { currentUser } = useAuth();
    console.log(currentUser.uid, uid)
    const messageClass = (uid === currentUser.uid ? "sent" : "received");
    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p>{text}</p>
        </div>
    </>)
}
