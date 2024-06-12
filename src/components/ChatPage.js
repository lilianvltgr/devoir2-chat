import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

function ChatPage(chatId) {
    // const {chatId} = useParams();
    const [user, setUser] = useState()
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(""); // État pour le message en cours de saisie
    const [ws, setWs] = useState(null);

    useEffect(() => {
        if(chatId.chatId){
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
        websocket.onopen = () => {console.log("WebSocket Connected")
            setMessages([]);
            console.log("Ouverture : "+messages);
        }

        websocket.onmessage = (event) => {
            const newMessage = event.data;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log("Message reçu : "+messages);
        };

        websocket.onerror = (error) => {
            console.log("WebSocket Error: ", error);
            setMessages([]);
            console.log("Erreur : "+messages);
        };
        websocket.onclose = () => {
            console.log("WebSocket Disconnected");
            setMessages([]);
            console.log("Fermer : "+messages);

        };
        setWs(websocket);

        return () => {
            if (websocket) {
                websocket.close();
            }
        };
        };

    }, [chatId]);
    const handleSendMessage = () => {
        if (message !== "" && ws && ws.readyState === WebSocket.OPEN) {
            let json = JSON.stringify({
                message: message,  user: user.lastname +" "+ user.firstname, chatId:chatId.chatId
            });
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
