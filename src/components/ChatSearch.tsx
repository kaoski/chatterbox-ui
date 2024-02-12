import {ChangeEvent, useState} from "react";

interface ChatSearchProps {
    filterChat: (searchTerm: string) => void;
}

export default function ChatSearch ({filterChat}: ChatSearchProps) {

    const [searchTerm, setSearchTerm] = useState<string>('');

    function handleSearchTermChange (event: ChangeEvent<HTMLInputElement>) {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        filterChat(newSearchTerm);
    }

    return (
        <input type="text" onChange={handleSearchTermChange} value={searchTerm} />
    );
}