import React, {useEffect, useState} from 'react';
import {TextField, Typography, Grid, Box, ListItemText, Divider, IconButton} from "@mui/material";
import List from '@mui/material/List';
import "../chat.css"
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import ScheduleChat from "./ScheduleChat";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
// import {DateField, DateTimePicker, TimeField, MultiInputTimeRangeField} from "@mui/x-date-pickers-pro";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const InvitedChatsList = () => {
    const [Chats, setChats] = useState([]);
    let userId = sessionStorage.getItem("userId")
    const navigate = useNavigate(); // useNavigate est appelé au niveau supérieur
    const handleClick = (path) => {
        navigate(path); // Utilise la fonction 'navigate' dans un handler
    };
    useEffect(() => {
        if (userId !== undefined) {
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
        }
        else
            return <Login></Login>
    }, []);

    return (
        <div className="container">
            <Header/>
            <div className="main-content">
                <Sidebar/>
                <div className="content">
                    <Typography variant="h3" component="h2" mt={2} mb={3} justifyContent="center">
                        Mes invitations de chat
                    </Typography>
                    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        <List>
                            {Chats.map(Chat => (
                                <React.Fragment key={Chat.chatId}>
                                    <ListItem>
                                        <ListItemText primary={Chat.title} secondary={Chat.description}
                                                      onClick={() => handleClick(`/chat/${Chat.chatId}`)}/>

                                    </ListItem>
                                    <Divider component="li"/>
                                </React.Fragment>
                            ))}
                        </List>

                    </Box>
                </div>
            </div>
        </div>
    );
}

export default InvitedChatsList;


