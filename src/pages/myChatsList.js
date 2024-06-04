import React, {useState} from 'react';
import {TextField, Typography, Grid, Box, ListItemText} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import ScheduleChat from "./ScheduleChat";
import Login from "../components/Login";
// import {DateField, DateTimePicker, TimeField, MultiInputTimeRangeField} from "@mui/x-date-pickers-pro";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function chatsList() {
    let userId = sessionStorage.getItem("userId")
    if (userId) {
        let requestUrl = "http://localhost:8080/UserController/chatsCreatedBy" + userId
        axios.get(requestUrl
            , {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
            .then(response => (console.log("success" + response)))
            .catch(error => console.error('Error:', error));

        return (
            // <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <Typography variant="h3" component="h2" mt={2} mb={3} justifyContent="center">
                    Mes chats
                </Typography>
                <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>

                    <List>
                        <ListItem>
                            <ListItemText primary="test"/>
                        </ListItem><ListItem>
                        <ListItemText primary="test"/>
                    </ListItem><ListItem>
                        <ListItemText primary="test"/>
                    </ListItem>
                    </List>
                </Box>
            </div>
        );
    } else
        return <Login></Login>
}

export default chatsList;


