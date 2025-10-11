import React from 'react';
import './header.css';

function Header () {
    return(
        <header className='header'>
            <h1 className="logo">SoundSpace</h1>
            <nav className="nav">
                <a href="#">Home</a>
                <a href="#">Library</a>
                <a href="#">Search</a>
                <a href="#">SharePlay</a>
            </nav>
        </header>
    );

}
export default Header