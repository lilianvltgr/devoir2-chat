import React, {useEffect, useState} from 'react';
import {Typography, Box, ListItemText, Divider, TablePagination} from "@mui/material";
import List from '@mui/material/List';
import "../chat.css"
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import Login from "./Login";
import Header from "../components/Header";
import ChatComponent from "../components/ChatComponent";
import chatIcon from "../icons/chat-icon.svg";

const InvitedChatsList = () => {
    const [Chats, setChats] = useState([]);
    const [ChatId, setChatId] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let userId = sessionStorage.getItem("userId")
    const handleClick = (chatId) => {
        setChatId(chatId)
        console.log("cliqué");
    };
    useEffect(() => {
        if (userId !== undefined) {
            let requestUrl = "http://localhost:8080/UserController/InvitedChatsFor/" + userId
            axios.get(requestUrl
                , {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    const allChats = response.data;
                    let goodChats = []
                    const today = new Date().toLocaleString();
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
                <div className="content">
                    <Typography variant="h6" component="h6" mt={2} mb={3} justifyContent="center">
                        Mes invitations de chat
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

                                    </ListItem>
                                    <Divider component="li"/>
                                </React.Fragment>
                            ))}
                        </List>

                        <TablePagination rowsPerPageOptions={[6]}
                                         component="div"
                                         count={Chats.length}
                                         rowsPerPage={rowsPerPage}
                                         page={page}
                                         onPageChange={handleChangePage}
                                         onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>

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

export default InvitedChatsList;


