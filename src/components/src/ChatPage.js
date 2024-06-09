import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ChatPage() {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(""); // État pour le message en cours de saisie
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket(`ws://localhost:8080/chat/${chatId}`);

        websocket.onopen = () => console.log("WebSocket Connected");

        websocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data); // Supposant que le serveur envoie du JSON
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
            ws.send(JSON.stringify({ content: message })); // Envoi du message comme JSON
            setMessage(""); // Réinitialisation du champ de texte après l'envoi
        }
    };

    return (
        <div>
            {messages.map((msg, index) => (
                <p key={index}>{msg.content}</p> // Assure-toi que les messages ont une propriété 'content'
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
