import React from 'react'

const SearchBar = () => {
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder='Find a User'
                />
            </div>
            <div className="userChat">
                <img src="https://img.freepik.com/free-photo/young-woman-sunglasses-hat-black-leather-jacket-posing-outdoor_231208-13405.jpg?t=st=1713560377~exp=1713563977~hmac=ca3b1e2ad7e11bd32d6b29d1700fe7c09e9cb8befa053e359de36943e4a70c76&w=360" alt="" />
                <div className="userChatInfo">
                    <span>Abhishek</span>
                    <p>Hey There !</p>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;