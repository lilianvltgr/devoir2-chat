import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Chip, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../chat.css";

/**
 * ChatComponent handles the chat functionality, including message display and sending within a given frontend session.
 * It interacts with both local session storage and backend services to fetch and display user and message data.
 *
 * @param {Object} chatId - Contains the chatId to identify the specific chat session.
 */
function ChatComponent(chatId) {
    // Hooks initialisation
    const [user, setUser] = useState()
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [ws, setWs] = useState(null);
    //Test if the session is valid
    let today= new Date().toLocaleString();
    if(sessionStorage.getItem("endSessionTime")<today || !sessionStorage.getItem("userId")){
        window.location.href = "http://localhost:3000/";
        sessionStorage.clear();
    }
    // UseEffect running only when chatId is set
    useEffect(() => {
        if (chatId.chatId) {
            // Request to get user information and store it to the user hook
            let requestUrl = "http://localhost:8080/UserController/userInfos/" + sessionStorage.getItem("userId")
            axios.get(requestUrl
                , {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    setUser(response.data)
                })
                .catch(error => console.error('Error:', error));
            // Creating webSocket to communicate with server
            const websocket = new WebSocket(`ws://localhost:8080/chat/${chatId.chatId}`);
            websocket.onopen = () => {
                setMessages([]);
            }
            websocket.onmessage = (event) => {
                const newMessage = JSON.parse(event.data); // Parse le JSON reçu
                setMessages((prevMessages) => [newMessage, ...prevMessages]);
            };
            websocket.onerror = (error) => {
                setMessages([]);
            };
            websocket.onclose = () => {
                setMessages([]);
            };
            setWs(websocket);
            return () => {
                if (websocket) {
                    websocket.close();
                }
            };
        }
    }, [chatId]);

    /**
     * Handles sending a message over the WebSocket connection
     * if message content exists and socket is open.
     */
    const handleSendMessage = () => {
        if (message !== "" && ws && ws.readyState === WebSocket.OPEN) {
            let json = JSON.stringify({
                message: message,
                user: user.lastname + " " + user.firstname,
                userId: sessionStorage.getItem("userId"),
                chatId: chatId.chatId
            });
            // Sending message to the server
            ws.send(json);
            // message reinitialisation
            setMessage("");
        }
    };
    // return chat interface displayed as the main content of the app
    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((msg, index) => {
                    const isCurrentUserMessage = msg.userId === sessionStorage.getItem("userId")
                    return (
                        <div key={index} className={`message ${isCurrentUserMessage ? 'current-user' : ''}`}>
                            <div className="user-info">{msg.user}</div>
                            <Chip label={msg.message} className={isCurrentUserMessage ? 'current-user-chip' : ''}/>
                            <br/>
                        </div>
                    );
                })}
            </div>
            <div className="input-container">
                <TextField
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ecrire un message..."
                />
                <Button onClick={handleSendMessage}>Envoyer</Button>
            </div>
        </div>
    );
}

export default ChatComponent;

