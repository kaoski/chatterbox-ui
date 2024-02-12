import React from "react";
import Chat from "../interfaces/Chat";
import "./ChatMiniView.css";

interface ChatProps {
    chat: Chat;
    selectChat: (chatId: string) => void;
}

export default function ChatMiniView ({chat, selectChat} : ChatProps) {
    // chat.messages.sort((a,b) => a.lastUpdated.getUTCSeconds() - b.lastUpdated.getUTCSeconds());
    return (
        <li className="chat-view" onClick={() => selectChat(chat.id)}>
            <img src={chat.profilePic} alt={chat.name} />
            <div className="chat-mini-detail">
                <span>{chat.name}</span>
                <p>{chat.messages[chat.messages.length - 1].text}</p>
            </div>
            
        </li>
    );
};