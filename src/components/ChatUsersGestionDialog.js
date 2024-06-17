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

/**
 * ChatUsersGestionDialog provides an interface for managing user participation in a specific chat session.
 * It renders a dialog box where a user can add or remove participants from one of their personal chat sessions.
 *
 * @param {Object} chatId - Contains the chatId to identify the specific chat session.
 * @returns {JSX.Element} A modal dialog component that allows the user to manage participants in the chat.
 */

const ChatUsersGestionDialog = (chatId) => {
    // Hooks initialisation 
    const [open, setOpen] = useState(false);
    const [UsersNotInChat, setUsersNotInChat] = useState([]);
    const [UsersInChat, setUsersInChat] = useState([]);
    const [SelectedAddUsers, setSelectedAddUsers] = useState([]);
    const [SelectedRemoveUsers, setSelectedRemoveUsers] = useState([]);
    const userId = sessionStorage.getItem("userId");
    
    // Function that get not invited users to propose them in a menu
    const getNotInvitedUsers = (chatId) => {
        // First we get all active users 
        const usersRequest = axios.get("http://localhost:8080/UserController/getAllActiveUsers", {
            headers: {
                "Retry-After": 3600,
                'Access-Control-Allow-Origin': '*'
            }
        });
        // Second we get users already in the chat 
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
            // Get users not in chat by removing users in of the user list 
            const usersNotInChat = allUsers.filter(user =>
                !usersInChat.some(u => u.userId === user.userId) && user.userId !== userId
            );
            setUsersInChat(usersInChat);
            setUsersNotInChat(usersNotInChat);
        }).catch(error => {
            console.error('Error:', error);
        });
    };
    // FUnction that handle the click on the button that manages people in chat
    const handleAddButtonClickOpen = () => {
        setOpen(true);
        getNotInvitedUsers(chatId);
    };
    // Function handling changes on the menu that add users
    const handleAddSelectChange = (event) => {
        setSelectedAddUsers(event.target.value);
    };
    // Function handling changes on the menu that remove users
    const handleRemoveSelectChange = (event) => {
        setSelectedRemoveUsers(event.target.value);
    };
    // Function adding users to the chat after being selected on the add menu
    const AddUsersToChat = () => {
        let userId = 0;
        let requestUrl = ("http://localhost:8080/UserController/addUsersToChat?chatId=" + chatId.chatId)
        // Building the request url by adding every selected user on the url
        while (userId < SelectedAddUsers.length) {
            requestUrl = requestUrl + "&userIds=" + SelectedAddUsers[userId]
            userId++;
        }
        // Sending the request url
        axios.post(requestUrl
            , {
                headers: {
                    "Retry-After": 3600,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "Application/json"
                }
            })
            .then(() => {
            })
            .catch(error => {
                console.error('Error:', error)
            });
        // Closing the dialog menu when the changes are done
        setOpen(false);
    }
    // Function removing users to the chat after being selected on the remove menu
    const RemoveUsersToChat = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet/ces utilisateur/rice.s ?")) {
            let userId = 0;
            let requestUrl = ("http://localhost:8080/UserController/deleteChatUsers?chatId=" + chatId.chatId)
            // Building the request url
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
                })
                .catch(error => {
                    console.error('Error:', error)
                });
        }
        // Closing the dialog menu when the changes are done
        setOpen(false);
    }
    // Function closing the dialog when the button "annuler" has been clicked on
    const handleClose = () => {
        setOpen(false);
    };
    // return jsx that displays buttons for a dialog that propose users adding and removing in a chat
    return (
        <div>
            <IconButton edge="end" aria-label="add people" title="Gérer les invités" onClick={handleAddButtonClickOpen}>
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
