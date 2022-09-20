import {useEffect, useState} from "react";

export default function Home() {
  const [socket, setSocked] = useState();
  useEffect(()=> {
    setSocked(new WebSocket("wss://javascript.info/article/websocket/chat/ws"));
  }, []);

  const submitMessage = (e) => {
    e.preventDefault();
    const message = document.forms.publish.message.value;
    socket.send(message);
  }

  if(socket){
    socket.onmessage = function(event) {
      let message = event.data;

      let messageElem = document.createElement('div');
      messageElem.textContent = message;
      document.getElementById('messages').prepend(messageElem);
    }
  }



  return (
    <div>
      <form name="publish" onSubmit={submitMessage}>
        <input type="text" name="message"/>
        <input type="submit" value="Send"/>
      </form>
      <div id="messages"></div>
    </div>
  )
}
