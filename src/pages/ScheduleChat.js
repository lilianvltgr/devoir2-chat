import React, {useState} from 'react';
import {TextField, Typography, Grid, Box} from "@mui/material";
import axios from "axios";
import Header from "../components/Header";
import {Alert} from '@mui/material';
import Button from "@mui/material/Button";

/**
 * Page component that renders a form to create a new Chat,
 * thanks to multiple attributes to fill : title, description, creationDate and duration.
 * The component submits these credentials to a server endpoint
 * and handles the response by rendering a success message.
 *
 * @returns {JSX.Element} A form for chat scheduling.
 */
function ScheduleChat() {
    const [chat, setChat] = useState({
        title: "",
        description: '',
        creationDate: "",
        duration: 0,
        creatorId: sessionStorage.getItem("userId")
    });
    const [isSubmitted, setIsSubmitted] = useState([false, ""]);
    const handleChange = (e) => {
        console.log("---> handle...")
        const {name, value} = e.target;
        setChat(prevChat => ({
            ...prevChat,
            [name]: value
        }));
        console.log(chat);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(chat);
        if (chat.title === "") {
            alert("Le titre du chat ne peut être vide");
            return;
        }
        if (!chat.creationDate) {
            alert("Choisissez une date de début");
            return;
        }
        if (chat.duration <= 0) {
            alert("La durée doit être superieure à 0");
            return;
        }
        axios.post("http://localhost:8080/UserController/createChat",
            chat, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
            .then(response => {
                console.log("success" + response);
                setIsSubmitted([true, chat.title]);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container">
            <Header/>
            {isSubmitted[0] && (
                <Alert sx={{mt: 2, margin: 2, borderRadius: 2, backgroundColor: '#CDE3F8'}} severity="success">
                    Le Chat "{isSubmitted[1]}" a été ajouté avec succès.
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
                                    label="Titre"
                                    placeholder="Titre"
                                    onChange={handleChange}
                                    name="title"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Description"
                                    placeholder="Description"
                                    multiline
                                    maxRows={4}
                                    onChange={handleChange}
                                    name="description"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <p style={{marginBottom: 0, marginLeft: 12, color: "grey"}}> Date de début du chat</p>


                                <input type="datetime-local"
                                       style={{marginTop: 0}}
                                       onChange={handleChange}
                                       name="creationDate"
                                       className="custom-button"
                                       placeholder="Date et heure de début"
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
                    <br></br>
                    <Button type="Submit" style={{margin: 12}} variant="contained"> Ajouter</Button>
                </form>
            </div>
        </div>
    );
}

export default ScheduleChat;
