import React, { useState } from 'react';
import {TextField, Typography, Grid, Box} from "@mui/material";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// import {DateField, DateTimePicker, TimeField, MultiInputTimeRangeField} from "@mui/x-date-pickers-pro";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Alert } from '@mui/material';

function ScheduleChat() {
    const [chat, setChat] = useState({

        title: 'test',
        description: 'test',
        creationDate: new Date("1010-10-10"),
        duration: 0,
        creatorId: sessionStorage.getItem("userId")
    });
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleChange = (e) => {

        console.log("---> handle...")

        const { name, value } = e.target;
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
           chat, {headers : {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
            .then(response => {
                console.log("success" + response);
                setIsSubmitted(true);
            })
            .catch(error => console.error('Error:', error));
    };

    const test = () => {
        console.log(chat)
    }

    return (

        <div className="container">
            <Header/>
            {isSubmitted && (
                <Alert sx={{ mt: 2, borderRadius: 2, backgroundColor: '#CDE3F8' }} severity="success">
                    Le Chat a été ajouté avec succès.
                </Alert>
            )}
            <div className="main-content-schedule">
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
                                           className="custom-button"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <input type="number"
                                           onChange={handleChange}
                                           name="duration"
                                           placeholder="Durée du chat (heure)"
                                           className="custom-button"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <button onClick={test} className="validate-button">Ajouter</button>
                    </form>
            </div>
            </div>


    );
}

export default ScheduleChat;
