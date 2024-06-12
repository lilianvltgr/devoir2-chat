import React, {useEffect, useState} from 'react';
import {TextField, Typography, Grid, Box, ListItemText, Divider, IconButton, TablePagination} from "@mui/material";
import List from '@mui/material/List';
import "../chat.css"
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import ScheduleChat from "./ScheduleChat";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
import ChatPage from "../components/ChatPage";

const InvitedChatsList = () => {
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
                    (console.log("success" + response));
                    setChats(response.data)

                })
                .catch(error => console.error('Error:', error));
        }
        else
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
                                    <ListItem>
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
                <div>
                    <ChatPage chatId={ChatId}></ChatPage>
                </div>
            </div>
        </div>
    );
}

export default InvitedChatsList;


