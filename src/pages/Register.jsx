import addAvatar from "/images/addAvatar.png"

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-wrapper">
                <div className="heading">
                    <span className="logo">Chit Chat</span>
                    <span className="page-title">Register</span>
                </div>
                <form className="sign-up-form">
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="file" style={{ display: "none" }} id="file-upload" />
                    <label htmlFor="file-upload"><img src={addAvatar} alt="avatar" className="avatar-icon" />Add an Avatar</label>
                    <button className="sign-up-btn">Sign Up</button>
                </form>
                <p>You do have an account? <a href="#">Login</a></p>
            </div>
        </div>
    )
}

export default Register
