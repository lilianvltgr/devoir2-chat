import React, {useState} from 'react';
import {TextField, Typography, Grid, Box, ListItemText} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import ScheduleChat from "./ScheduleChat";
// import {DateField, DateTimePicker, TimeField, MultiInputTimeRangeField} from "@mui/x-date-pickers-pro";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

    function chatsList() {
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
}
export default chatsList;


