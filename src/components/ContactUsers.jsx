import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ContactUsers = () => {
    const [chats, setChats] = useState([]);

    const activeUser = useContext(LoginContext);

    useEffect(() => {
        const fetchChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", activeUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            }
        };
        activeUser.uid && fetchChats();
    }, [activeUser.uid]);
    return (
        <div className="chats">
            {Object.entries(chats).map(chat => (
                <div className="userChat" key={chat[0]}>
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].userInfo.lastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ContactUsers;