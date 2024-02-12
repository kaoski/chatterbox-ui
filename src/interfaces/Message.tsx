import MessageType from "../enums/MessageType";
import { User } from "./User";

export interface Message<Receiver=string> {
    id: string;
    text: string;
    type: MessageType;
    sender: User;
    receiver: User []; 
    created: Date;
    lastUpdated: Date;
};

export interface Reply extends Message {
    replyToMessageId: string;
};

export interface Forward extends Message {
    originalMessageId: string;
}

