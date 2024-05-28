import { useContext, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"
import { LoginContext } from "../context/LoginContext";
import { doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";

const SearchBar = () => {
    const activeUser = useContext(LoginContext);
    const [username, setUsername] = useState();
    const [user, setUser] = useState(activeUser);
    const [error, setError] = useState(false);

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (error) {
            setError(true);
            console.log("Error:", error);
        }

    };

    const handleKeyDown = (e) => {
        e.code == "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        const combinedId = activeUser.uid > user.uid ? activeUser.uid + user.uid : user.uid + activeUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                await setDoc(doc(db, 'chats', combinedId), { message: [] });

                await updateDoc(doc(db, 'userChats', activeUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: activeUser.uid,
                        displayName: activeUser.displayName,
                        photoURL: activeUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                })
            }
            setUser(null)
            setUsername("")
        } catch (error) {
            console.log("Error is :" + error);
        }
    }

    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder='Find a User'
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {error && alert("User not Found!")}
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                    <p>Hey There !</p>
                </div>
            </div>}
        </div>
    )
}

export default SearchBar;