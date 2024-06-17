// Header.js
import React from 'react';
import AppIcon from '../icons/app-icon.png'
import {IconButton} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from "@mui/material/Button";
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThreePIcon from '@mui/icons-material/ThreeP';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

/**
 * Header component that is used in all the application and allows the user
 * to navigate to the different routes of the app with several buttons.
 * They lead respectively to ScheduleChat, MyChatsList, InvitedChatsList and Login.
 *
 * @returns {JSX.Element} a header used in all the app.
 */
const Header = () => {
    // Session validation verification
    var today = new Date().toLocaleString();
    if (sessionStorage.getItem("endSessionTime") < today || !sessionStorage.getItem("userId")) {
        window.location.href = "http://localhost:3000/";
        sessionStorage.clear();
    }
    // Function that logs out the user and redirects to the login page
    const logout = () => {
        sessionStorage.clear();
        window.location.href = "/Login";
    }
    const handleAdminClick = () => {
        window.location.href = "http://localhost:8080/AdminController";
    };
    const handleScheduleClick = () => {
        window.location.href = "http://localhost:3000/schedule";
    };
    const handleMyChatsClick = () => {
        window.location.href = "http://localhost:3000/myChatsList";
    };
    const handleInvitedChatsClick = () => {
        window.location.href = "http://localhost:3000/InvitedChatsList";
    };
    // displays a header with buttons to interact with the app
    return (
        <header className="app-header">
            <img src={AppIcon} alt="Logo" style={{height: '50px'}}/>
            <h1>Chat-App</h1>
            <div className="link-container">
                <Button onClick={handleScheduleClick}>
                    <AddCommentIcon></AddCommentIcon> Nouveau Chat </Button>
                <Button onClick={handleMyChatsClick}>
                    <ThreePIcon></ThreePIcon> Mes chats </Button>
                <Button onClick={handleInvitedChatsClick}>
                    <MarkUnreadChatAltIcon></MarkUnreadChatAltIcon> Invitations </Button>
            </div>
            <Button onClick={handleAdminClick}>Administration</Button>
            <IconButton className="IconButton" on aria-label="exit" color="primary" onClick={logout}>
                <ExitToAppIcon></ExitToAppIcon>
            </IconButton>
        </header>
    );
};

export default Header;
