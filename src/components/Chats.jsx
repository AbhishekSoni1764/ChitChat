import { FaVideo } from "react-icons/fa6";
import { TiUserAdd } from "react-icons/ti";
import { HiDotsHorizontal } from "react-icons/hi";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

const Chats = () => {

    const content = useContext(MessageContext);
    const conarray = Object.entries(content)
    return (
        <div className='chats'>
            <div className="chat-header">
                <span>{conarray[0][1].user.displayName}</span>
                <div className="media-icons">
                    <FaVideo />
                    <TiUserAdd />
                    <HiDotsHorizontal />
                </div>
            </div>
            <div className="messages">
                <Messages />
            </div>
            <div className="chat-input">
                <ChatInput />
            </div>
        </div>
    )
}

export default Chats