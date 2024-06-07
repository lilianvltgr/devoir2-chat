// Header.js
import React from 'react';
import AppIcon from '../icons/app-icon.png' // Assurez-vous de mettre le chemin correct vers votre logo

const Header = () => {
    return (
        <header className="app-header">
            <img src={AppIcon} alt="Logo" style={{ height: '50px' }} />
            <h1>Chat-App</h1>
        </header>
    );
};

export default Header;
