import React, {useState} from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {Box, Divider, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const AddUserToChatDialog = (chatId) => {
    const [open, setOpen] = useState(false);
    const [UsersNotInChat, setUsersNotInChat] = useState([]);
    const [UsersInChat, setUsersInChat] = useState([]);
    const [Users, setUsers] = useState([]);
    const [SelectedUsers, setSelectedUsers] = useState([]);
    const userId = sessionStorage.getItem("userId");
    const getNotInvitedUsers = (chatId) => {

        axios.get("http://localhost:8080/UserController/getAllActiveUsers"
            , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => console.error('Error:', error));
        let requestUrl = "http://localhost:8080/UserController/getUsersInChat/" + chatId.chatId
        axios.get(requestUrl
            , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                setUsersInChat(response.data)
            })
            .catch(error => console.error('Error:', error));
        setUsersNotInChat(Users.filter(item => (!UsersInChat.includes(item) && item.userId !== userId)))
    };
    const handleClickOpen = () => {
        console.log("Ouverture !!");
        console.log("chatId", chatId.chatId);

        getNotInvitedUsers(chatId);
        setOpen(true);
    };
    const handleSelectChange = (event) => {
        setSelectedUsers(event.target.value);
    };
    const AddUsersToChat = () => {
            let requestUrl = "http://localhost:8080/UserController/addUsersToChat"
            axios.get(requestUrl
                , {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "Application/json"
                    }, params:{
                        "userIds":JSON.stringify(SelectedUsers),
                        "chatId":chatId.chatId
                    }
                })
                .then(response => {
                    console.log("success!");
                })
                .catch(error => console.error('Error:', error));
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton edge="end" aria-label="add people" title="Gérer les invités" onClick={handleClickOpen}>
                <PersonAddAltIcon/>
            </IconButton>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                    <React.Fragment>
                        <Box component="form">
                            <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel htmlFor="demo-dialog-native">User</InputLabel>
                                <Select id="selectedUsers"
                                        multiple
                                        value={SelectedUsers}
                                        onChange={handleSelectChange}
                                    // input={<OutlinedInput label="Age" id="demo-dialog-native"/>}
                                >
                                    {
                                        UsersNotInChat.map(User => (
                                                    <MenuItem key={User.userId} value={User.userId}>
                                                        {User.firstname}
                                                </MenuItem>
                                            )
                                        )}
                                </Select>
                            </FormControl></Box>
                    </React.Fragment>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={AddUsersToChat} color="primary">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddUserToChatDialog;
