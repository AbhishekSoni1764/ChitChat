import React from 'react'
import SideNav from './SideNav'
import SearchBar from './SearchBar'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <SideNav />
            <SearchBar />
        </div>
    )
}

export default Sidebar