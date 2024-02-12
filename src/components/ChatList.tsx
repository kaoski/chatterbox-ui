import React from "react";
import Chat from "../interfaces/Chat";
import ChatMiniView from "./ChatMiniView";
import "./ChatList.css";
import ChatSearch from "./ChatSearch";

interface ChatListProps {
    chatList: Chat [];
    selectChat: (chatId: string) => void;
    filterChat: (searchTerm: string) => void;
}

export default function ChatList ({chatList, selectChat, filterChat}: ChatListProps) {
    return (
        <section id="chat-list-container" className="bg-secondary">
            <ChatSearch filterChat={filterChat}/>
            <ul id="chat-list">
                {chatList.map(chat => <ChatMiniView key={chat.id} chat={chat} selectChat={selectChat}/>)}
            </ul>
        </section>
    );
};