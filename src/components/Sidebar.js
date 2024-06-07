import React from 'react';
import {Link} from "react-router-dom";
import AddIcon from '../icons/add-icon.svg';
import PersoIcon from '../icons/perso-icon.svg';
import ListIcon from '../icons/list-icon.svg';
import InviteIcon from '../icons/invite-icon.svg';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="link-container">
                <Link to="/schedule" className="sidebar-button">
                    <img src={AddIcon} alt="Ajouter Chat" />
                    Ajouter Chat
                </Link>
                <Link to="/myChatsList" className="sidebar-button">
                    <img src={PersoIcon} alt="Mes salons" />
                    Mes salons
                </Link>
                <Link to="/InvitedChatsList" className="sidebar-button">
                    <img src={InviteIcon} alt="Invitations" />
                    Invitations
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
