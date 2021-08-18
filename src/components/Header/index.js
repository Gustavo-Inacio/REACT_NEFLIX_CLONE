import React from 'react';
import './styles.css';
import netflixLogo from '../../assets/Netflix_logo.png'

export default ({color}) => {
    return (
        <header className={color ? 'setBlackHeader' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={netflixLogo}/>
                </a>
                
            </div>
            <div className="header--userLogo">
                <a href="/">
                    <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"/>
                </a>
            </div>
        </header>
    );
}