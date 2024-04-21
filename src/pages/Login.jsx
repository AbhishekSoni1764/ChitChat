import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const emailElement = useRef();
    const passwordElement = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailElement.current.value;
        const password = passwordElement.current.value;

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")

        } catch (error) {
            setError(true)
            console.log(error)
        }


    }
    return (
        <div className="register-container">
            <div className="register-wrapper">
                <div className="heading">
                    <span className="logo">Chit Chat</span>
                    <span className="page-title">Login</span>
                </div>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" ref={emailElement} id="email" />
                    <input type="password" placeholder="Password" ref={passwordElement} id="password" />
                    <button className="sign-up-btn" type="submit">Sign Up</button>
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
                {error && <span>Not Found !</span>}
            </div>
        </div>
    )
}

export default Login;
