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
    
    const dummy = useRef();
    const messagesRef = database.ref("questions/" + settings.currentQuestionURl + "/posts");
    const query = messagesRef.orderByChild('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const { currentUser } = useAuth();

    const sendMessage = async (e) => {
        e.preventDefault();
        const uid = currentUser.uid;
        const photoURL  = currentUser.photoURL;
        await messagesRef.add({
            text: formValue,
            createdAt: new Date().getTime(),
            uid,
            photoURL
        })
        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <main>
                {messages && messages.map(msg => <Post key={msg.id} message={msg} />)}
                <span ref={dummy}></span>
            </main>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
                <button type="submit" disabled={!formValue}>🕊️</button>
            </form>
        </>
    )
}



function Post(props) {
    const { text, uid, photoURL } = props.message;
    const { currentUser } = useAuth();

    const messageClass = uid === currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p>{text}</p>
        </div>
    </>)
}
