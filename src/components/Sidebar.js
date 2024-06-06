import React from 'react';
import {Link} from "react-router-dom";
import AddIcon from '../icons/add-icon.svg';

const Sidebar = () => {
    return (
        <div>
            <Link to="/schedule" className="sidebar-button">
                <img src={AddIcon} alt="Ajouter Chat" />
                Ajouter Chat</Link>
            <br/>
            <Link to="/myChatsList" class="sidebar-button">Mes salons</Link>
            <br/>
            <Link to="/InvitedChatsList" class="sidebar-button">Invitations</Link>
        </div>
    );
};

export default Sidebar;
