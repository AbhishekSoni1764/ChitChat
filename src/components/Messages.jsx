
import { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { MessageContext } from '../context/MessageContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const content = useContext(MessageContext);
    const conarray = Object.entries(content);
    // console.log(conarray[0][1].user.photoURL)
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", conarray[0][1].chatid), (doc) => {
            console.log(doc.data())
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        }
    }, [conarray[0][1].chatid]);
    return (
        <div>
            {messages.map(msg => (<Message message={msg} key={msg.id} />))}
        </div>
    )
}

export default Messages;