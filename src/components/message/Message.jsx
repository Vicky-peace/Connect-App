import React, {useRef, useEffect} from 'react';
import { format } from "timeago.js";
const Message = ({message, own}) => {
    const scroll = useRef();

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior: 'smooth'});
    }, [message]);
    // console.log(message);
  return (
    <div ref={scroll} className= {own ? "message own" : "message"}>
        <div className="messageTop">
        <p className="messageText">{message?.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
