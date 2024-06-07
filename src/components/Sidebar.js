import React from 'react';
import {Link} from "react-router-dom";
import AddIcon from '../icons/add-icon.svg';
import PersoIcon from '../icons/perso-icon.svg';
import ListIcon from '../icons/list-icon.svg';
import InviteIcon from '../icons/invite-icon.svg';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/schedule" className="sidebar-button">
                <img src={AddIcon} alt="Ajouter Chat" width="30px"/>
                Ajouter Chat
            </Link>
            <Link to="/mychatslist" className="sidebar-button">
                <img src={PersoIcon} alt="Mes salons" width="30px"/>
                Mes salons
            </Link>
            <Link to="/chats" className="sidebar-button">
                <img src={InviteIcon} alt="Invitations" width="30px"/>
                Invitations
            </Link>
        </div>
    );
};

export default Sidebar;
