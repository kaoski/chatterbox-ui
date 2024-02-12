import ChatType from "../enums/ChatType";
import { Message } from "./Message";
import { User } from "./User";

export default interface Chat {
    id: string;
    type: ChatType;
    participants: User [];
    name: string;
    profilePic: string;
    messages: Message [];
    configuration: string [];
};