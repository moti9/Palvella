import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import configStore from '../app/configStore';

const cookie = configStore.cookie;

const HandleOrders = () => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const isAuthenticated = useSelector((state) => state.palvella.isAuthenticated);
    const id = useSelector((state) => state.palvella.id);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        // Retrieve the WebSocket base URL and token from environment variables
        const baseUrl = import.meta.env.VITE_WS_BASE_URL;
        const token = cookie.get("access_token");

        // Create a new WebSocket connection
        const socketUrl = `${baseUrl}/ws/b/${id}/orders/?token=${token}`;
        const ws = new WebSocket(socketUrl);

        ws.onopen = () => {
            console.log('WebSocket connection established');
          };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        ws.onclose = (event) => {
            if (event.wasClean) {
                console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
            } else {
                console.log('Connection died');
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Set the WebSocket instance to state
        setSocket(ws);

        // Cleanup function to close the WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, [id]);

    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    };

    return (
        <div>
            <h2>WebSocket Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{JSON.stringify(msg)}</li>
                ))}
            </ul>
            <button onClick={() => sendMessage({ type: 'order', content: 'Another test order' })}>
                Send Test Message
            </button>
        </div>
    );
};

export default HandleOrders;
