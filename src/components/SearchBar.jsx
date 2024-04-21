import { useContext, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"
import { LoginContext } from "../context/LoginContext";


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
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder='Find a User'
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            {error && alert("User not Found!")}
            {user && <div className="userChat">
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