import { useEffect, useState } from "react";
import { generateData } from "./utils/loadDataUtil.temp";
import ChatList from "./components/ChatList";
import Chat from "./interfaces/Chat";
import ChatDetailView from "./components/ChatDetailView";
import { User } from "./interfaces/User";
import "./App.css";

function App() {

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [hostUser, setHostUser] = useState<User | null>(null);

  useEffect(() => {
    const {hostUser, friends, chatList} = generateData();
    setChatList(chatList);
    setHostUser(hostUser);
    console.log("Host User", hostUser);
    console.log("Friends", friends);
    console.log("Chat List", chatList);
  }, []);

  function selectChat (chatId: string) {
    const [chat] = chatList.filter(chat => chat.id === chatId);
    setActiveChat(chat);
  }

  function filterChat (searchTerm: string) {
    let {chatList} = generateData();
    if (searchTerm.length > 0) {
      chatList = chatList.filter((chat) => {
        if (chat.name.search(searchTerm) !== -1) {
          return true;
        }
        for (let message of chat.messages) {
          if (message.text.search(searchTerm) !== -1) {
            return true;
          }
        }
        return false;
      });
    }
    console.log(chatList);
    setChatList(chatList);
  }
  
  return (
    <div className="App">
      <ChatList filterChat={filterChat} selectChat={selectChat} chatList={chatList}/>
      {activeChat && <ChatDetailView chat={activeChat} hostUser={hostUser!}/>}
    </div>
  );
}

export default App;
