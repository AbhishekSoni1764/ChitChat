import addAvatar from "/images/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase"
import { useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import { v4 } from "uuid"

const Register = () => {
    const [error, setError] = useState(false);

    const userNameElement = useRef();
    const emailElement = useRef();
    const passwordElement = useRef();
    const fileElement = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = userNameElement.current.value;
        const email = emailElement.current.value;
        const password = passwordElement.current.value;
        const file = fileElement.current.value;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res)
            const storageRef = ref(storage, `${displayName + v4()}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

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
                            await updateProfile(res.user, {
                                displayName,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL,
                            });
                        } catch (error) {
                            console.log("Error is", error)
                        }
                    });
                }
            );
        } catch (error) {
            setError(true)
            console.log("Error is ", error)
        }
    }
    return (
        <div className="register-container">
            <div className="register-wrapper">
                <div className="heading">
                    <span className="logo">Chit Chat</span>
                    <span className="page-title">Register</span>
                </div>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" id="userName" ref={userNameElement} />
                    <input type="email" placeholder="Email" id="email" ref={emailElement} />
                    <input type="password" placeholder="Password" id="password" ref={passwordElement} />
                    <input type="file" style={{ display: "none" }} id="file" ref={fileElement} />
                    <label htmlFor="file"><img src={addAvatar} alt="avatar" className="avatar-icon" />Add an Avatar</label>
                    <button type="submit" className="sign-up-btn">Sign Up</button>
                </form>
                <p>You do have an account? <Link to="/login">Login</Link></p>
                {error && <span>Account Exists !</span>}
            </div>
        </div>
    )
}

export default Register
