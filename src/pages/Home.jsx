import Chats from "../components/Chats"
import Sidebar from "../components/Sidebar"

const Home = () => {
    return (
        <div className="home">
            <div className="home-wrapper">
                <Sidebar />
                <Chats />
            </div>
        </div>
    )
}

export default Home
