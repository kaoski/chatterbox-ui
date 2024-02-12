import {format} from 'date-fns';
import { User } from '../interfaces/User';

export function formatTime (date: Date, formatString: string): string {
    return format(date, formatString);
}

export function isHostUser (user: User, hostUser: User) {
    return user.id === hostUser.id;
}

export function getOtherUsers (participants: User [], hostUser: User) {
    return participants.filter(user => user.id !== hostUser.id);
}