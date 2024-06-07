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
import {Box, Divider, FormControl, InputLabel, ListItemText, OutlinedInput, Select} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const AddUserToChatDialog = (chatId) => {
    const [open, setOpen] = useState(false);
    const [UsersInChat, setUsersInChat] = useState([]);
    const [Users, setUsers] = useState([]);
    const getUserInvitedToTheChat = (chatId) => {

        axios.get("http://localhost:8080/UserController/getAllActiveUsers"
            , {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                setUsers(response.data)
                console.log(Users);
            })
            .catch(error => console.error('Error:', error));
        // let requestUrl = "http://localhost:8080/UserController/getUsersInChat" + chatId
        // axios.get(requestUrl
        //     , {
        //         headers: {
        //             'Access-Control-Allow-Origin': '*'
        //         }
        //     })
        //     .then(response => {
        //         setUsersInChat(response.data)
        //     })
        //     .catch(error => console.error('Error:', error));

    };
    const handleClickOpen = () => {
        setOpen(true);
        getUserInvitedToTheChat(chatId);
    };

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
                            <Select
                                native
                                value="test"
                                // onChange={handleChange}
                                // input={<OutlinedInput label="Age" id="demo-dialog-native"/>}
                            >
                                {
                                    Users.map(User => (
                                        <option value={User.userId}>{User.firstname}
                                        </option>
                                        )
                                    )}
                            </Select>
                        </FormControl></Box>
                </React.Fragment>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
);
};

export default AddUserToChatDialog;
