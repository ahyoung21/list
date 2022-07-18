import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { nameAction, roomAction } from '../store/modules/user';

import io from 'socket.io-client';

import styled from 'styled-components';
import theme from '../common/theme';

import Header from './Header';
import Upload from './Upload';
import Messages from './Messages';
import Input from './Input';

let socket;

const Chat = () => {
  const disaptch = useDispatch();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [imageUrl, setImageUrl] = useState(null);

  const { state } = useLocation();

  const [UploadOpen, setUploadOpen] = useState(false);

  const ENDPOINT = 'https://ahyoung21.herokuapp.com/';
  // const ENDPOINT = 'http://localhost:5080/';

  const handleUpoladOpen = useCallback(() => {
    setUploadOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const { name, room } = state;

    socket = io(ENDPOINT); // 소켓 연결

    disaptch(nameAction(name));
    disaptch(roomAction(room));

    socket.emit('join', { name, room }, (error) => {
      // 에러 처리
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [state]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
      console.log(message);
    });

    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (imageUrl) {
      socket.emit('sendMessage', imageUrl, setMessage(''));
    }
  }, [imageUrl]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, setMessage(''));
    }
  };

  return (
    <ChatBox>
      <Inner>
        <ChatItem>
          <Header handleUpoladOpen={handleUpoladOpen} />
          {UploadOpen && <Upload socket={socket} setImageUrl={setImageUrl} />}
          <Messages messages={messages} imageUrl={imageUrl} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </ChatItem>
      </Inner>
    </ChatBox>
  );
};

export default Chat;

const ChatBox = styled.div`
  height: 100vh;
`;

const Inner = styled.div`
  display: flex;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;
`;

const ChatItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.paleGrey};
`;
