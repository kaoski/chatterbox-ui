import { Message } from "../interfaces/Message"
import { User } from "../interfaces/User";
import { formatTime } from "../utils/Utils";
import "./MessageView.css";

interface MessageViewProps {
    message: Message;
    hostUser: User;
}


export default function MessageView ({message, hostUser} : MessageViewProps) {
    
    return (
        <div className={`message ${message.sender.id === hostUser.id ? "hostMessage" : "friendMessage"}`}>
            <p>{message.text}</p>
            <span className="message-time">{formatTime(message.created, "HH:mm")}</span>
        </div>
    );
};