import React from 'react';

const Header = (props) => {
    return(
        <header>
            <div className="logo">Awesome Movie App</div>
            <nav>
                <ul>
                    <li onClick={() => props.setPage('home')}>Home</li>
                    <li onClick={() => props.setPage('movies')}>Movies</li>
                    <li onClick={() => props.setPage('login')}>Log In</li>
                    <li onClick={() => props.setPage('register')}>Register</li>
                    <li onClick={() => props.setPage('user')}>User Dashboard</li>
                    <li onClick={props.logOut}>Logout</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
