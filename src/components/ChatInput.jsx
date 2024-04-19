import { IoMdAttach } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";

const ChatInput = () => {
    return (
        <div className="chat-input">
            <input
                type="text"
                placeholder="Type something..."
            />
            <div className="send-chat">
                <IoMdAttach size="19px" />
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                />
                <label htmlFor="file">
                    <MdAddPhotoAlternate size="19px" style={{ marginTop: "3px" }} />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default ChatInput