import React, { useState, useEffect, useRef } from "react";
import Logosearch from "../../components/LogoSearch/Logosearch";
import { useSelector, useDispatch } from "react-redux";
import { getChats, chatUser } from "../../redux/apiCall";
import Conversation from "../../components/conversation1/Conversation";
import { Link } from "react-router-dom";
import NavIcons from "../../components/NavIcons/NavIcons";
import Chatbox from "../../components/chatBox/Chatbox";
import { io } from 'socket.io-client';
import "./chat.css";

const Chat = () => {
  const dispatch = useDispatch();
  const [currentChat, setCurrentChat] = useState(null);
  const [currentMember, setCurrentMember] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setreceiveMessage] = useState(null);

  const user = useSelector((state) => state.user.currentUser.user);
  const chat = useSelector((state) => state.chat.chatUser?.data);

  // console.log(chat, "all chats");

  const socket = useRef();

  useEffect(()=>{
    if(sendMessage !== null){
      socket?.current?.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  useEffect(() => {

    getChats(dispatch, user?.id);
  }, []);

  const updateChat = async (chat, id) => {
    setCurrentChat(chat);
    setCurrentMember(id);
    chatUser(dispatch, id);
}

  return (
    <div className="Chat">
      {/* Left side */}
      <div className="Left-side-chat">
        <Logosearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chat?.map((chat) => {
              const members = JSON.parse(chat?.members);
              const id = members?.find((id) => id !== user?.id);
              return (
                <div onClick={() => updateChat(chat, id)} key={chat?.id}>
                    <Conversation data={chat} user={user?.id} members={members} onlineUsers={onlineUsers} />
                </div>
            )
            })}
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <Chatbox chat={currentChat} currentUser={user?.id} currentMember={currentMember} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
      </div>
    </div>
  );
};

export default Chat;
