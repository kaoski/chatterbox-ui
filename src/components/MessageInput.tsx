import { ChangeEvent, useState } from "react";
import Chat from "../interfaces/Chat";
import { User } from "../interfaces/User";
import { Message } from "../interfaces/Message";
import MessageType from "../enums/MessageType";
import {v4 as uuid4} from "uuid";
import "./MessageInput.css";

interface MessageInputProps {
    chat: Chat;
    hostUser: User;
    otherUsers: User[];
    addNewMessage: (message: Message) => void;
}

export default function MessageInput ({chat, hostUser, otherUsers, addNewMessage}: MessageInputProps) {

    const [message, setMessage] = useState<string>('');

    function handleMessageChange(event: ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    function sendMessage() {
        const newMessage : Message = {text: message, type: MessageType.SINGLE, sender: hostUser, receiver: otherUsers, 
        id: uuid4(), created: new Date(), lastUpdated: new Date()};
        addNewMessage(newMessage);
        setMessage('');
    }

    return (
        <section id="message-input">
            <input type="text" value={message} onChange={handleMessageChange}/>
            <button type="submit" onClick={sendMessage}>Send</button>
        </section>
    );
};