import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import ChatData from '../data/ChatList.json';

import SocketIOFileUpload from 'socketio-file-upload';

let uploader;

function Upload({ socket, setImageUrl }) {
  const buttonRef = useRef();
  const addUpload = useCallback((e) => {
    uploader.prompt();
    uploader.addEventListener('complete', function (event) {
      // socket.on('upload.progress', function (e) {
      //   console.log(e);
      // });
      setImageUrl(event.file.name);
    });
    // uploader.addEventListener('progress', function (event) {
    //   var percent = (event.bytesLoaded / event.file.size) * 100;
    //   console.log('File is', percent.toFixed(2), 'percent loaded');
    // });
  }, []);

  useEffect(() => {
    uploader = new SocketIOFileUpload(socket);
  }, []);

  return (
    <UploadBox>
      {ChatData &&
        ChatData.map((chat, idx) => {
          return (
            <button ref={buttonRef} key={idx} onClick={addUpload}>
              <img src={`${process.env.PUBLIC_URL}${chat.thumbNailPath}`} />
            </button>
          );
        })}
    </UploadBox>
  );
}

export default Upload;

const UploadBox = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 3rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  background: #5b36ac;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  button {
    display: inline-block;
    flex: 0 0 auto;
    width: 9rem;
    height: 9rem;
    border-radius: 0.8rem;
    cursor: pointer;
    overflow: hidden;

    & + button {
      margin-left: 2rem;
    }
  }
`;
