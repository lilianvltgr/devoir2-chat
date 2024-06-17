// Header.js
import React from 'react';
import AppIcon from '../icons/app-icon.png'
import {Link} from "react-router-dom";
import AddIcon from "../icons/add-icon.svg";
import PersoIcon from "../icons/perso-icon.svg";
import InviteIcon from "../icons/invite-icon.svg";
import {IconButton} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from "@mui/material/Button";
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThreePIcon from '@mui/icons-material/ThreeP';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

const Header = () => {
    var today= new Date().toLocaleString();
    console.log(sessionStorage.getItem("userId"))
    if(sessionStorage.getItem("endSessionTime")<today || !sessionStorage.getItem("userId")){
        window.location.href = "http://localhost:3000/";
        sessionStorage.clear();
        console.log("fin de la session");
    }

    const logout = () => {
        sessionStorage.clear();
        window.location.href = "/Login";
        console.log("test");
    }

    const handleAdminClick = () => {
        window.location.href = "http://localhost:8080/AdminController";
    };
        const handleScheduleClick = () => {
        window.location.href = "http://localhost:3000/schedule";
    }; const handleMyChatsClick = () => {
        window.location.href = "http://localhost:3000/myChatsList";
    };const handleInvitedChatsClick = () => {
        window.location.href = "http://localhost:3000/InvitedChatsList";
    };

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
                    {/*<Link to="/schedule" className="sidebar-button">*/}
                    {/*    <img src={AddIcon} alt="Ajouter Chat"/>*/}
                    {/*    Ajouter Chat*/}
                    {/*</Link>*/}
                    {/*<Link to="/myChatsList" className="sidebar-button">*/}
                    {/*    <img src={PersoIcon} alt="Mes salons"/>*/}
                    {/*    Mes salons*/}
                    {/*</Link>*/}
                    {/*<Link to="/InvitedChatsList" className="sidebar-button">*/}
                    {/*    <img src={InviteIcon} alt="Invitations"/>*/}
                    {/*    Invitations*/}
                    {/*</Link>*/}
            </div>
            <Button onClick={handleAdminClick}>Administration</Button>
            <IconButton className="IconButton" on aria-label="exit" color="primary" onClick={logout}>
                <ExitToAppIcon></ExitToAppIcon>
            </IconButton>
        </header>
    );
};

export default Header;
