import React, {useState} from 'react';
import {TextField, Typography, Grid, Box} from "@mui/material";
import axios from "axios";
import Sidebar from "../components/Sidebar";
// import {DateField, DateTimePicker, TimeField, MultiInputTimeRangeField} from "@mui/x-date-pickers-pro";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function ScheduleChat() {
    const [chat, setChat] = useState({

        title: 'test',
        description: 'test',
        creationDate: new Date("1010-10-10"),
        duration: 0,
        creatorId: sessionStorage.getItem("userId")
    });

    const handleChange = (e) => {

        console.log("---> handle...")

        const {name, value} = e.target;
        setChat(prevChat => ({
            ...prevChat,
            [name]: value
            // pour le time prendre le premier element du MultiInputTimeRangeField
            // faire cas special pour duration -> calculer temps entre heure début et heure fin
        }));
        console.log(chat);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/UserController/createChat",
            chat, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
            .then(response => (console.log("success" + response)))
            .catch(error => console.error('Error:', error));


        //axios.get("http://localhost:8080/test/truc").then(res => {
        // axios.get("http://localhost:8080/UserController/chatsCreatedBy/2").then(res => {
        //     console.log(res)
        // });
    };

    const test = () => {
        console.log(chat)
    }

    return (
        <div className="container">
            <div className="sidebar">
                <Sidebar/>
            </div>
            <div className="col-md-9">
                <form onSubmit={handleSubmit}>
                    <Typography variant="h3" component="h2" mt={2} mb={3} justifyContent="center">
                        Planifier un chat
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container rowSpacing={1}>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    placeholder="Titre"
                                    onChange={handleChange}
                                    name="title"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Multiline"
                                    placeholder="Description"
                                    multiline
                                    maxRows={4}
                                    onChange={handleChange}
                                    name="description"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <input type="datetime-local"
                                       onChange={handleChange}
                                       name="creationDate"
                                       class="custom-button"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <input type="number"
                                       onChange={handleChange}
                                       name="duration"
                                       placeholder="Durée du chat (heure)"
                                       class="custom-button"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <button onClick={test} class="validate-button">Ajouter</button>
                </form>
            </div>
        </div>
    );
}

export default ScheduleChat;
