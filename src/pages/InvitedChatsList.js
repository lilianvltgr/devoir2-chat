import React, {useState} from 'react';
import {TextField, Typography, Grid, Box, ListItemText} from "@mui/material";
import List from '@mui/material/List';
import "../chat.css"
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import ScheduleChat from "./ScheduleChat";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
// import {DateField, DateTimePicker, TimeField, MultiInputTimeRangeField} from "@mui/x-date-pickers-pro";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const InvitedChatsList = () => {
    const [Chats, setChats] = useState([]);
    let userId = sessionStorage.getItem("userId")
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

        return (
            <div className="container">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="col-md-9">
                    <Typography variant="h3" component="h2" mt={2} mb={3} justifyContent="center">
                        Mes invitations de chat
                    </Typography>
                    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        <List>
                            {Chats.map(Chat => (
                                <ListItem>
                                    <ListItemText primary={Chat.title} secondary={Chat.description}/>
                                </ListItem>
                            ))}
                        </List>

                    </Box>
                </div>
            </div>
        );
    } else
        return <Login></Login>
}

export default InvitedChatsList;


