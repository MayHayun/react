import { useState, useEffect } from 'react'

import * as Ably from 'ably';
import { AblyProvider, useChannel, usePresence } from 'ably/react';
import './App.css';

const ably = new Ably.Realtime({ key: 'Pns68A.YZZ_rg:7kRIzyMgEs_ZtiQL' });
const channel = ably.channels.get('messenger');

function App() {
  const user = 'May'
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    channel.subscribe('message', message => {
      setMessages(prevMessages => [...prevMessages, message.data]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      channel.publish('message', user +': ' + input);
      setInput('');
    }
  };

  return (
    <>
    <div className="App">
      <div className="Messages">
        {messages.map((message, index) => (
          <div key={index} className="Message">
            {message}
          </div>
        ))}
      </div>
      <div className="Input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
    </>
  );
}

export default App
