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
import ChatList from "./components/ChatList";
import ScheduleChat from "./pages/ScheduleChat";
import MyChatsList from "./pages/MyChatsList";
import InvitedChatsList from "./pages/InvitedChatsList";
import ClientChat from "./ChatsCom/Client.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/schedule" element={<ScheduleChat />} />
            <Route path="/myChatsList" element={<MyChatsList />} />
            <Route path="/InvitedChatsList" element={<InvitedChatsList />} />
            <Route path="/clientChat" element={<ClientChat />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
