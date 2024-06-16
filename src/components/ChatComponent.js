import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Chip, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../chat.css";

function ChatComponent(chatId) {
    // const {chatId} = useParams();
    const [user, setUser] = useState()
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(""); // État pour le message en cours de saisie
    const [ws, setWs] = useState(null);
    useEffect(() => {
        if (chatId.chatId) {
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
            const websocket = new WebSocket(`ws://localhost:8080/chat/${chatId.chatId}`);
            websocket.onopen = () => {
                console.log("WebSocket Connected")
                setMessages([]);
                console.log("Ouverture : " + messages);
            }
            websocket.onmessage = (event) => {
                const newMessage = JSON.parse(event.data); // Parse le JSON reçu
                setMessages((prevMessages) => [newMessage, ...prevMessages]);
                console.log("Received message: ", newMessage);
            };
            websocket.onerror = (error) => {
                console.log("WebSocket Error: ", error);
                setMessages([]);
                console.log("Erreur : " + messages);
            };
            websocket.onclose = () => {
                console.log("WebSocket Disconnected");
                setMessages([]);
                console.log("Fermer : " + messages);
            };
            setWs(websocket);
            return () => {
                if (websocket) {
                    websocket.close();
                }
            };
        }
    }, [chatId]);
    const handleSendMessage = () => {
        if (message !== "" && ws && ws.readyState === WebSocket.OPEN) {
            let json = JSON.stringify({
                message: message,
                user: user.lastname + " " + user.firstname,
                userId: sessionStorage.getItem("userId"), // Inclure userId
                chatId: chatId.chatId
            });
            ws.send(json); // Envoi du message comme JSON
            setMessage(""); // Réinitialisation du champ de texte après l'envoi
        }
    };
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
