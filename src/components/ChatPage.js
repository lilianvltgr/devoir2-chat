import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

function ChatPage() {
    const {chatId} = useParams();
    const [user, setUser] = useState([])
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(""); // État pour le message en cours de saisie
    const [ws, setWs] = useState(null);

    useEffect(() => {
        let requestUrl = "http://localhost:8080/UserController/InvitedChatsFor/" + userId
        axios.get(requestUrl
            , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                (console.log("success" + response));
                setChats(response.data)

            })
            .catch(error => console.error('Error:', error));

        const websocket = new WebSocket(`ws://localhost:8080/chat/${chatId}`);

        websocket.onopen = () => console.log("WebSocket Connected");

        websocket.onmessage = (event) => {
            const newMessage = event.data;
            console.log("new message received : " + newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        websocket.onerror = (error) => {
            console.log("WebSocket Error: ", error);
        };

        websocket.onclose = () => console.log("WebSocket Disconnected");

        setWs(websocket);

        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, [chatId]);

    const handleSendMessage = () => {
        if (message !== "" && ws && ws.readyState === WebSocket.OPEN) {
            let json = JSON.stringify({
                message: message,  user: 'test'
            });
            console.log(json);
            ws.send(json); // Envoi du message comme JSON
            setMessage(""); // Réinitialisation du champ de texte après l'envoi
        }
    };

    return (
        <div>
            {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatPage;
