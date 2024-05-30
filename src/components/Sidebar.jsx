import SideNav from './SideNav'
import SearchBar from './SearchBar'
import ContactUsers from './ContactUsers'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <SideNav />
            <SearchBar />
            <ContactUsers />
        </div>
    )
}

export default Sidebar