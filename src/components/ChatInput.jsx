import { useContext, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MessageContext } from "../context/MessageContext";
import { LoginContext } from "../context/LoginContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 } from 'uuid';
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ChatInput = () => {
    const [textMsg, setTextMsg] = useState("")
    const [img, setImg] = useState(null)

    const activeUser = useContext(LoginContext);
    const content = useContext(MessageContext);
    const conarray = Object.entries(content);


    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, v4());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log("Error is", error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        try {
                            await updateDoc(doc(db, "chats", conarray[0][1].chatid), {
                                messages: arrayUnion({
                                    id: v4(),
                                    textMsg,
                                    senderId: activeUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                })
                            });
                        } catch (error) {
                            console.log("Error is", error)
                        }
                    });
                }
            );
        }
        else {
            await updateDoc(doc(db, "chats", conarray[0][1].chatid), {
                messages: arrayUnion({
                    id: v4(),
                    textMsg,
                    senderId: activeUser.uid,
                    date: Timestamp.now(),
                })
            });
        }

        await updateDoc(doc(db, "userChats", activeUser.uid), {
            [conarray[0][1].chatid + ".lastMessage"]: {
                textMsg,
            },
            [conarray[0][1].chatid + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", conarray[0][1].user.uid), {
            [conarray[0][1].chatid + ".lastMessage"]: {
                textMsg,
            },
            [conarray[0][1].chatid + ".date"]: serverTimestamp(),
        });
        setTextMsg("")
        setImg(null)
    }

    return (
        <div className="chat-input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setTextMsg(e.target.value)}
                value={textMsg}
            />
            <div className="send-chat">
                <IoMdAttach size="19px" />
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <MdAddPhotoAlternate size="19px" style={{ marginTop: "3px" }} />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default ChatInput