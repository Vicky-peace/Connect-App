import React, {useState,useRef} from 'react';
import Message from '../message/Message';
import './chatbox.css';
import {useSelector,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getMessage, createMessage, addMessage } from '../../redux/apiCall';
import InputEmoji from 'react-input-emoji';
import {BiSolidSend} from 'react-icons/bi'
const Chatbox = ({ chat, currentUser, currentMember, setSendMessage, receiveMessage}) => {
  // console.log(receiveMessage);
  const user = useSelector((state) => state.user.currentUser.user);

  console.log(chat)
  
  // const id = chat?.id;
  const receiverId = currentMember;
  const dispatch = useDispatch();
  const messages = useSelector((state) => state?.message?.messages);

  const [newmessage, setNewMessage] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(()=>{
    if(receiveMessage !== null && receiveMessage.chatId === chat?.id){
      addMessage(dispatch,receiveMessage);
    }
  }, [receiveMessage]);

  useEffect(()=> {
    
    getMessage(dispatch,chat?.id);
  }, [chat,currentUser])

  const handleChange = (newmessage) => {
    setNewMessage(newmessage);
  }

  const handleSend = (e) =>{
    e.preventDefault();
    const message = {
      senderId: user?.id,
      text: newmessage,
      chatId: chat?.id,
      
  }
  createMessage(dispatch, message);
  setNewMessage("");
  setSendMessage({ ...message, receiverId });
  }
  return (
    <div className='chatBox'>
    <div className="chatBoxWrapper">
        <div className='chatBoxTop'>
            {
                messages?.map((message) => message?.senderId == user?.id ? (<Message own={true} message={message} key={message?.id} />) : (<Message message={message} key={message?.id} />))
            }
        </div>
        <div className='chatboxbottom'>
            <InputEmoji className='chatMessageInput' value={newmessage} onChange={handleChange} placeholder="Send message ..."  />
            <button className='chatSubmitButton' onClick={handleSend}><BiSolidSend/></button>
        </div>
    </div>
</div>
  )
}

export default Chatbox
