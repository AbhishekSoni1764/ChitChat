/* eslint-disable react/prop-types */
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { MessageContext } from "../context/MessageContext";
import ReactTimeAgo from "react-time-ago";

const Message = ({ message }) => {
    const activeUser = useContext(LoginContext);
    const content = useContext(MessageContext);
    const conarray = Object.entries(content);

    // console.log(conarray[0][1].user.photoURL)
    return (
        <div className={`message ${message.senderId === activeUser.uid && "owner"}`}>
            <div className="status">
                <img src={message.senderId === activeUser.uid ? activeUser.photoURL : conarray[0][1].user.photoURL} alt="" />
                <p>Just Now</p>
            </div>
            <div className="chat-text ">
                <p>{message.textMsg}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message;
