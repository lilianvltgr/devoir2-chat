import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import {Link} from "react-router-dom";
import ChatsList from "../pages/MyChatsList";

const ChatList = (props) => {
    const [chats, setChats] = useState([])

    // => "onload"
    useEffect(() => {
        //TODO Recuperer la liste des chats du user depuis le backend spring
        // axios.get...
        setChats([
            {
                'id': 1,
                'title': 'chat 1',
                'description' : 'le 1er chat'
            },
            {
                'id': 2,
                'title': 'chat 2',
                'description' : 'le 2e chat'
            }
        ])
    }, [])

    return (

            <div className="container">
                <Sidebar/>
                <div className="content">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {chats.map((chat) => (
                            <tr key={chat.id}>
                                <td>{chat.title}</td>
                                <td>{chat.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
        </div>
    );
};

export default ChatList;
