import React, {useState} from 'react';
import {TextField, Typography, Grid, Box, ListItemText, Divider, IconButton} from "@mui/material";
import "../chat.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ScheduleChat from "./ScheduleChat";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";

// import {DateField, DateTimePicker, TimeField, MultiInputTimeRangeField} from "@mui/x-date-pickers-pro";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ChatsList= () => {
    const [Chats, setChats] = useState([]);
    let userId = sessionStorage.getItem("userId")

    function handleDeleteButton(chatId) {
        let requestUrl = "http://localhost:8080/UserController/deleteChatUser/" + chatId
        axios.delete(requestUrl
            , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                (console.log("success" + response));
            })
            .catch(error => console.error('Error:', error));
        requestUrl = "http://localhost:8080/UserController/deleteChat/" + chatId
        axios.delete(requestUrl
            , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                (console.log("success" + response));
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));

    }


    if (userId !== undefined) {
        let requestUrl = "http://localhost:8080/UserController/chatsCreatedBy/" + userId
        axios.get(requestUrl
            , {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }})
            .then(response => {
                (console.log("success" + response));
                setChats(response.data)
            })
            .catch(error => console.error('Error:', error));

        return (
            <div className="container">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="col-md-9">
                    <Typography variant="h3" component="h2" mt={2} mb={3} justifyContent="center">
                        Mes chats
                    </Typography>
                    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        <List>
                            {Chats.map(Chat => (
                                <React.Fragment>
                                <ListItem>
                                    <ListItemText primary={Chat.title} secondary={Chat.description}/>
                                    <IconButton edge="end" aria-label="comments" onClick={() => handleDeleteButton(Chat.chatId)}>
                                        <DeleteOutlineIcon></DeleteOutlineIcon>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="add people">
                                        <PersonAddAltIcon></PersonAddAltIcon>
                                    </IconButton>
                                </ListItem>
                                <Divider component="li" />
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                </div>
            </div>
        );
    } else
        return <Login></Login>
}

export default ChatsList;


