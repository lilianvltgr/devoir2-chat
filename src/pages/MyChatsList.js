import React, {useEffect, useRef, useState} from 'react';
import {TextField, Typography, Grid, Box, ListItemText, Divider, IconButton, TablePagination} from "@mui/material";
import "../chat.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ScheduleChat from "./ScheduleChat";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddUserToChatDialog from "../components/AddUserToChatDialog";
import ChatPage from "../components/ChatPage";

const ChatsList = () => {
    const [Chats, setChats] = useState([]);
    const [ChatId, setChatId] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let userId = sessionStorage.getItem("userId")

    const handleClick = (chatId) => {
        setChatId(chatId)
        console.log("cliqué");
        // navigate(path); // Utilise la fonction 'navigate' dans un handler
    };
    function handleDeleteButton(chatId) {
        let requestUrl = "http://localhost:8080/UserController/deleteChatUser/" + chatId
        axios.delete(requestUrl
            , {
                headers: {
                    "Retry-After": 3600,
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
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
            .then(response => {
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
    }
    useEffect(() => {
        if (userId !== undefined) {
            let requestUrl = "http://localhost:8080/UserController/chatsCreatedBy/" + userId
            axios.get(requestUrl
                , {
                    headers: {
                        "Retry-After": 3600,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    setChats(response.data)
                })
                .catch(error => console.error('Error:', error));
        } else
            return <Login></Login>
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
                                    <ListItem className="chat" >
                                        <ListItemText   primary={Chat.title} secondary={Chat.description}
                                                      onClick={() => handleClick(Chat.chatId)}/>
                                        <IconButton onClick={() => handleDeleteButton(Chat.chatId)} edge="end" aria-label="comments" title="Supprimer">
                                            <DeleteOutlineIcon></DeleteOutlineIcon>
                                        </IconButton>
                                        <AddUserToChatDialog chatId={Chat.chatId}/>
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
                    <ChatPage chatId={ChatId}></ChatPage>
            </div>
        </div>
    );
}
export default ChatsList;