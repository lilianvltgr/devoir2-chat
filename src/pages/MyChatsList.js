import React, {useEffect, useState} from 'react';
import {Typography, Box, ListItemText, Divider, IconButton, TablePagination} from "@mui/material";

import "../chat.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Login from "./Login";
import Header from "../components/Header";
import ChatUsersGestionDialog from "../components/ChatUsersGestionDialog";
import ChatComponent from "../components/ChatComponent";
import chatIcon from '../icons/chat-icon.svg';

/**
 * Page component that renders the personnal Chats List of the connected user.
 * The user is identified thanks to its userId stored in the sessionStorage.
 *
 * @returns {JSX.Element} A list of chats.
 */
const ChatsList = () => {
    // Hooks initialisation
    const [Chats, setChats] = useState([]);
    const [ChatId, setChatId] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let userId = sessionStorage.getItem("userId")

    const handleClick = (chatId) => {
        setChatId(chatId)
    };

    // Function that delete a chat when the delete button has been clcked on
    function handleDeleteButton(chatId) {
        //Confirmation of the delete action
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce chat ? Cette action est irréversible.")) {
            let requestUrl = "http://localhost:8080/UserController/deleteChatUser/" + chatId
            axios.delete(requestUrl
                , {
                    headers: {
                        "Retry-After": 3600,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(() => {
                })
                .catch(error => console.error('Error:', error));
            requestUrl = "http://localhost:8080/UserController/deleteChat/" + chatId
            axios.delete(requestUrl
                , {
                    headers: {
                        "Retry-After": 3600,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(() => {
                    // reload to avoid displaying the deleted chat
                    window.location.reload();
                })
                .catch(error => console.error('Error:', error));
        }
    }

    // Code that runs at the start of the page to get chats owned by the connected user
    useEffect(() => {
        let requestUrl = "http://localhost:8080/UserController/chatsCreatedBy/" + userId
        axios.get(requestUrl
            , {
                headers: {
                    "Retry-After": 3600,
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                const allChats = response.data;
                let goodChats = []
                const today = new Date().toLocaleString();
                // keeping chats that are in today's range
                allChats.forEach(chat => {
                    let startDate = new Date(chat.creationDate).toLocaleString();
                    let endDate = new Date(chat.creationDate);
                    endDate.setHours(endDate.getHours() + chat.duration);
                    endDate = endDate.toLocaleString();
                    if (startDate < today && today < endDate) {
                        console.log(chat.title);
                        goodChats.push(chat)
                    }
                });
                setChats(goodChats)

            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, Chats.length - page * rowsPerPage);
    return (
        <div className="container">
            <Header/>
            <div className="main-content">
                {/*<Sidebar/>*/}
                <div className="content">
                    <Typography variant="h6" component="h6" mt={2} mb={3} justifyContent="center">
                        Mes chats
                    </Typography>
                    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        <List>
                            {(rowsPerPage > 0
                                    ? Chats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : Chats
                            ).map((Chat) => (
                                <React.Fragment key={Chat.chatId}>
                                    <ListItem className="chat">
                                        <ListItemText primary={Chat.title} secondary={Chat.description}
                                                      onClick={() => handleClick(Chat.chatId)}/>
                                        <IconButton edge="end" aria-label="comments" title="Supprimer"
                                                    onClick={() => handleDeleteButton(Chat.chatId)}>
                                            <DeleteOutlineIcon></DeleteOutlineIcon>
                                        </IconButton>
                                        <ChatUsersGestionDialog chatId={Chat.chatId}/>
                                    </ListItem>
                                    <Divider component="li"/>
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                    <TablePagination rowsPerPageOptions={[6]}
                                     component="div"
                                     count={Chats.length}
                                     rowsPerPage={rowsPerPage}
                                     page={page}
                                     onPageChange={handleChangePage}
                                     onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                <div className="chat-render">
                    {ChatId ? (
                        <ChatComponent chatId={ChatId}/>
                    ) : (
                        <Box classname="select-page">
                            <img src={chatIcon} alt="Chat Icon" className="select-chat-icon"/>
                        </Box>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ChatsList;


