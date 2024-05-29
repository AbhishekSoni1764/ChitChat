import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { MessageContext } from "../context/MessageContext";

const ContactUsers = () => {
    const [chats, setChats] = useState([]);

    const activeUser = useContext(LoginContext);
    const { dispatch } = useContext(MessageContext)

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

    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user })
    }
    // console.log(Object.entries(chats)[2][1])
    return (
        <div className="chats">
            {Object.entries(chats).map(chat => (
                <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage ? chat[1].lastMessage.textMsg : ""}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ContactUsers;