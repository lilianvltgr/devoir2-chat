import React from 'react';
import ReactDOM from 'react-dom/client';
import './chat.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ScheduleChat from "./pages/ScheduleChat";
import MyChatsList from "./pages/MyChatsList";
import InvitedChatsList from "./pages/InvitedChatsList";
import ChatComponent from "./components/ChatComponent";
import Login from "./pages/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/schedule" element={<ScheduleChat />} />
            <Route path="/myChatsList" element={<MyChatsList />} />
            <Route path="/chat/:chatId" element={<ChatComponent />} />
            <Route path="/InvitedChatsList" element={<InvitedChatsList />} />
            <Route path="/Login" element={<Login />} />
        </Routes>
    </BrowserRouter>
);
reportWebVitals();
