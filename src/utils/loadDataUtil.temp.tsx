import Chat from "../interfaces/Chat";
import { Message } from "../interfaces/Message";
import { User } from "../interfaces/User";
import { faker } from '@faker-js/faker';
import ChatType from "../enums/ChatType";
import MessageType from "../enums/MessageType";

const NUM_OF_FRIENDS = 10;
const MIN_MESSAGES = 10;
const MAX_MESSAGES = 20;

function generateRandomNumberWithingRange (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateUser (isHost: boolean): User {
    return {name: faker.person.fullName(),
        id: faker.string.uuid(), isHost: isHost, avatar: faker.image.avatar()};
}

function createUser (): User {
    return generateUser(true);
}

function generateFriends (numberOfUsers: number = NUM_OF_FRIENDS): User [] {
    const users: User[] = [];
    for (let i = 0 ; i < numberOfUsers; i++) {
        users.push(generateUser(false));
    }
    return users;
}

function generateMessage (sender: User, receiver: User): Message {
    return {id: faker.string.uuid(), text: faker.lorem.lines(2), type: MessageType.SINGLE, sender: sender, receiver : [receiver], created: new Date(), lastUpdated: new Date()};
}

function generateMessages(user1: User, user2 : User): Message [] {
    const numberOfMessages = generateRandomNumberWithingRange(MIN_MESSAGES, MAX_MESSAGES);
    const messages :Message [] = [];
    for (let i = 0 ; i < numberOfMessages; i++) {
        if (i & 1) {
            messages.push(generateMessage(user1, user2));
        } else {
            messages.push(generateMessage(user2, user1));
        }
    }
    return messages;
}

function generateChat (hostUser: User, otherUser: User): Chat {
    const chat: Chat = {
        id: faker.string.uuid(),
        type: ChatType.SINGLE,
        participants: [hostUser, otherUser],
        name: otherUser.name,
        profilePic: otherUser.avatar,
        messages: generateMessages(hostUser, otherUser),
        configuration: []
    };
    return chat;
}

function generateChatList (): {hostUser: User, friends: User[], chatList: Chat []} {
    const hostUser = createUser();
    const friends: User [] = generateFriends();
    const chatList: Chat [] = [];
    for (const friend of friends) {
        chatList.push(generateChat(hostUser, friend));
    }
    return {hostUser, friends, chatList};
}

export function generateData () {
    let chatList: Chat [] = [];
    let hostUser: User | null = null;
    let friends: User [] = [];
    if (localStorage.getItem("chatList") !== null) {
        chatList = JSON.parse(localStorage.getItem("chatList")!) as Chat [];
        hostUser = JSON.parse(localStorage.getItem("hostUser")!) as User;
        friends = JSON.parse(localStorage.getItem("friends")!) as User [];
        return {hostUser, friends, chatList};
    } else {
        const {hostUser, friends, chatList} = generateChatList();
        saveDataOnLocalStorage("chatList", chatList);
        saveDataOnLocalStorage("hostUser", hostUser);
        saveDataOnLocalStorage("friends", friends);
        return {hostUser, friends, chatList};
    }
}

export function saveDataOnLocalStorage (key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}
    