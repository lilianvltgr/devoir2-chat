import React, {useEffect, useRef, useState} from 'react';
import {TextField, Typography, Grid, Box, ListItemText, Divider, IconButton} from "@mui/material";
import "../chat.css";
import {useHistory, useNavigate} from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ScheduleChat from "./ScheduleChat";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddUserToChatDialog from "../components/AddUserToChatDialog";
import ChatPage from "../components/ChatPage";

// import {DateField, DateTimePicker, TimeField, MultiInputTimeRangeField} from "@mui/x-date-pickers-pro";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ChatsList = () => {
    const [Chats, setChats] = useState([]);
    const [ChatId, setChatId] = useState("");
    let userId = sessionStorage.getItem("userId")

    const handleClick = (chatId) => {
        setChatId(chatId)
        console.log("cliqué");
        // navigate(path); // Utilise la fonction 'navigate' dans un handler
    };

    useEffect(() => {
        function handleDeleteButton(chatId) {
            let requestUrl = "http://localhost:8080/UserController/deleteChatUser/" + chatId
            axios.delete(requestUrl
                , {
                    headers: {
                        "Retry-After": 3600,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                })
                .catch(error => console.error('Error:', error));
            requestUrl = "http://localhost:8080/UserController/deleteChat/" + chatId
            axios.delete(requestUrl
                , {
                    headers: {
                        "Retry-After": 3600,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    window.location.reload();
                })
                .catch(error => console.error('Error:', error));
        }

        if (userId !== undefined) {
            let requestUrl = "http://localhost:8080/UserController/chatsCreatedBy/" + userId
            axios.get(requestUrl
                , {
                    headers: {
                        "Retry-After": 3600,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    setChats(response.data)
                })
                .catch(error => console.error('Error:', error));
        } else
            return <Login></Login>
    }, []);

    return (
        <div className="container">
            <Header/>
            <div className="main-content">
                <Sidebar/>
                <div className="content">
                    <Typography variant="h3" component="h2" mt={2} mb={3} justifyContent="center">
                        Mes chats
                    </Typography>
                    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        <List>
                            {Chats.map(Chat => (

                                <React.Fragment key={Chat.chatId}>
                                    <ListItem>
                                        <ListItemText primary={Chat.title} secondary={Chat.description}
                                                      onClick={() => handleClick(Chat.chatId)}/>
                                        <IconButton edge="end" aria-label="comments" title="Supprimer">
                                            <DeleteOutlineIcon></DeleteOutlineIcon>
                                        </IconButton>
                                        <AddUserToChatDialog chatId={Chat.chatId}/>
                                    </ListItem>
                                    <Divider component="li"/>
                                </React.Fragment>

                                ))}
                        </List>

                    </Box>
                </div>
                <div className="content">
                    <ChatPage chatId={ChatId}></ChatPage>
                </div>
            </div>
        </div>
    );


}
export default ChatsList;


