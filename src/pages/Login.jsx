const Login = () => {
    return (
        <div className="register-container">
            <div className="register-wrapper">
                <div className="heading">
                    <span className="logo">Chit Chat</span>
                    <span className="page-title">Register</span>
                </div>
                <form className="sign-up-form">
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="sign-up-btn">Sign Up</button>
                </form>
                <p>You don't have an account? <a href="#">Register</a></p>
            </div>
        </div>
    )
}

export default Login;
