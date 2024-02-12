import Chat from "../interfaces/Chat";
import { User } from "../interfaces/User";
import MessageView from "./MessageView";
import "./ChatDetailView.css";
import { useState } from "react";
import { Message } from "../interfaces/Message";
import MessageInput from "./MessageInput";
import { getOtherUsers } from "../utils/Utils";

interface ChatDetailViewProps {
    chat: Chat;
    hostUser: User;
};

export default function ChatDetailView ({chat, hostUser} : ChatDetailViewProps) {

    const [messages, setMessages] = useState(chat.messages);

    function addNewMessage (message: Message) {
        setMessages(prevMessages => [...prevMessages, message]);
        chat.messages.push(message);
    }

    return (
            <section id="chat-detail-view">
                {chat.messages.map(message => <MessageView key={message.id} hostUser={hostUser} message={message}/>)}
                <MessageInput addNewMessage={addNewMessage} chat={chat} hostUser={hostUser} otherUsers={getOtherUsers(chat.participants, hostUser)}/>
            </section>
    );
};