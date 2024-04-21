import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'

const SideNav = () => {
    const activeUser = useContext(LoginContext)

    return (
        <div className='navbar'>
            <span className="nav-logo">Chit Chat</span>
            <div className="user">
                <img src={activeUser.photoURL} alt="user" />
                <span>{activeUser.displayName}</span>
                <button onClick={() => signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default SideNav