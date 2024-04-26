// WebSocketContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import stompClient from '../Patient/MySocket';
const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:9090/socket');
    const stomp = Stomp.over(socket);

    stomp.connect({}, () => {
      console.log('WebSocket connected');
      setStompClient(stomp);
    });

//     return () => {
//       if (stompClient) {
//         stompClient.disconnect();
//       }
//     };
  }, []);

  return (
    <WebSocketContext.Provider value={stompClient}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useStompClient = () => useContext(WebSocketContext);
