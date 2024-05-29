
import { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { MessageContext } from '../context/MessageContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const content = useContext(MessageContext);
    const conarray = Object.entries(content);
    // console.log(conarray[0][1].chatid)
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", conarray[0][1].chatid), (doc) => {
            doc.exists() && setMessages(doc.data().message);
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