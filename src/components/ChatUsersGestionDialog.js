import React, {useState} from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import axios from "axios";

const ChatUsersGestionDialog = (chatId) => {
    const [open, setOpen] = useState(false);
    const [UsersNotInChat, setUsersNotInChat] = useState([]);
    const [UsersInChat, setUsersInChat] = useState([]);
    const [SelectedAddUsers, setSelectedAddUsers] = useState([]);
    const [SelectedRemoveUsers, setSelectedRemoveUsers] = useState([]);
    const userId = sessionStorage.getItem("userId");
    const getNotInvitedUsers = (chatId) => {
        const usersRequest = axios.get("http://localhost:8080/UserController/getAllActiveUsers", {
            headers: {
                "Retry-After": 3600,
                'Access-Control-Allow-Origin': '*'
            }
        });
        const usersInChatRequest = axios.get(`http://localhost:8080/UserController/getUsersInChat/${chatId.chatId}`, {
            headers: {
                "Retry-After": 3600,
                'Access-Control-Allow-Origin': '*'
            }
        });
        Promise.all([usersRequest, usersInChatRequest]).then(values => {
            const [allUsersResponse, usersInChatResponse] = values;
            const allUsers = allUsersResponse.data;
            const usersInChat = usersInChatResponse.data;
            const usersNotInChat = allUsers.filter(user =>
                !usersInChat.some(u => u.userId === user.userId) && user.userId !== userId
            );
            setUsersInChat(usersInChat);
            setUsersNotInChat(usersNotInChat);
        }).catch(error => {
            console.error('Error:', error);
        });
    };
    const handleClickOpen = () => {
        console.log("Ouverture !!");
        setOpen(true);
        getNotInvitedUsers(chatId);
    };
    const handleAddSelectChange = (event) => {
        setSelectedAddUsers(event.target.value);
    };
    const handleRemoveSelectChange = (event) => {
        setSelectedRemoveUsers(event.target.value);
    };
    const AddUsersToChat = () => {
        let userId = 0;
        let requestUrl = ("http://localhost:8080/UserController/addUsersToChat?chatId=" + chatId.chatId)
        while (userId < SelectedAddUsers.length) {
            requestUrl = requestUrl + "&userIds=" + SelectedAddUsers[userId]
            userId++;
        }
        axios.post(requestUrl
            , {
                headers: {
                    "Retry-After": 3600,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "Application/json"
                }
            })
            .then(() => {
                console.log("success!");
            })
            .catch(error => {
                console.error('Error:', error)
            });
        setOpen(false);
    }
    const RemoveUsersToChat = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet/ces utilisateur/rice.s ?")) {
            let userId = 0;
            let requestUrl = ("http://localhost:8080/UserController/deleteChatUsers?chatId=" + chatId.chatId)
            while (userId < SelectedRemoveUsers.length) {
                requestUrl = requestUrl + "&userIds=" + SelectedRemoveUsers[userId]
                userId++;
            }
            axios.post(requestUrl
                , {
                    headers: {
                        "Retry-After": 3600,
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "Application/json"
                    }
                })
                .then(() => {
                    console.log("success!");
                })
                .catch(error => {
                    console.error('Error:', error)
                });
        }
        setOpen(false);
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <IconButton edge="end" aria-label="add people" title="Gérer les invités" onClick={handleClickOpen}>
                <PersonAddAltIcon/>
            </IconButton>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}
                    maxWidth="md">
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                    <React.Fragment>
                        <Box component="form">
                            <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel htmlFor="demo-dialog-native">Utilisateurs</InputLabel>
                                <Select id="SelectedAddUsers"
                                        multiple
                                        value={SelectedAddUsers}
                                        onChange={handleAddSelectChange}
                                >
                                    {
                                        UsersNotInChat.map(User => (
                                                <MenuItem key={User.userId} value={User.userId}>
                                                    {User.firstname} {User.lastname}
                                                </MenuItem>
                                            )
                                        )}
                                </Select>
                                <FormHelperText>Ajouter des utilisateurs au chat</FormHelperText>
                            </FormControl>
                            <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel htmlFor="demo-dialog-native">Utilisateurs</InputLabel>
                                <Select id="SelectedRemoveUsers"
                                        multiple
                                        value={SelectedRemoveUsers}
                                        onChange={handleRemoveSelectChange}
                                >
                                    {
                                        UsersInChat.map(User => (
                                                <MenuItem key={User.userId} value={User.userId}>
                                                    {User.firstname} {User.lastname}
                                                </MenuItem>
                                            )
                                        )}
                                </Select><FormHelperText>Supprimer des utilisateurs du
                                chat</FormHelperText>
                            </FormControl>
                        </Box>
                    </React.Fragment>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={AddUsersToChat} color="primary">
                        Ajouter
                    </Button> <Button onClick={RemoveUsersToChat} color="primary">
                    Supprimer
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ChatUsersGestionDialog;
