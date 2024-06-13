// Header.js
import React from 'react';
import AppIcon from '../icons/app-icon.png'
import {Link, redirect} from "react-router-dom";
import AddIcon from "../icons/add-icon.svg";
import PersoIcon from "../icons/perso-icon.svg";
import InviteIcon from "../icons/invite-icon.svg";
import {IconButton} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Login from "./Login"; // Assurez-vous de mettre le chemin correct vers votre logo

const Header = () => {

    const logout = () => {
        sessionStorage.clear();
        window.location.href = "/Login";
        console.log("test");
    }

    return (
        <header className="app-header">
            <img src={AppIcon} alt="Logo" style={{height: '50px'}}/>
            <h1>Chat-App</h1>
            <div className="link-container">
                <Link to="/schedule" className="sidebar-button">
                    <img src={AddIcon} alt="Ajouter Chat"/>
                    Ajouter Chat
                </Link>
                <Link to="/myChatsList" className="sidebar-button">
                    <img src={PersoIcon} alt="Mes salons"/>
                    Mes salons
                </Link>
                <Link to="/InvitedChatsList" className="sidebar-button">
                    <img src={InviteIcon} alt="Invitations"/>
                    Invitations
                </Link>

            </div>
            <IconButton className="IconButton" on aria-label="exit" color="primary" onClick={logout} >
                <ExitToAppIcon></ExitToAppIcon>
            </IconButton>
        </header>
    );
};

export default Header;
