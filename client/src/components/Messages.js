import React from 'react';
import styled from 'styled-components';

import Message from './Message';

const Messages = ({ messages }) => (
  <MessagesBox>
    {messages.map((message, i) => (
      <div key={i}>
        {i > 0 ? (
          messages[i].day !== messages[i - 1].day ? (
            <strong className="update-day">
              {messages[i].day.replace('-', '년 ').replace('-', '월 ') + '일'}
            </strong>
          ) : null
        ) : null}
        <Message
          message={message}
          timeChain={
            i > 0 // 첫번째니?
              ? messages.length === i + 1 // 마지막이니?
                ? true
                : message.time === messages[i + 1].time && // 현재 메세지와 바로 직전 메세지 시간이 같나?
                  message.user === messages[i + 1].user // 현재 유저와 다음 유저가 같나?
                ? false
                : true
              : true
          }
        />
      </div>
    ))}
  </MessagesBox>
);

export default Messages;

const MessagesBox = styled.div`
  flex: 5;
  padding: 4rem 3rem 0;
  overflow: auto;

  strong {
    display: block;
    position: relative;
    padding-top: 5rem;
    text-align: center;
    font-weight: 500;
    font-size: 2.4rem;
    color: #363a42;
    opacity: 0.4;

    &::before {
      content: '';
      position: absolute;
      top: 6rem;
      left: 0;
      width: calc(50% - 12rem);
      height: 0.1rem;
      border-bottom: 0.2rem solid #363a42;
      opacity: 0.4;
    }

    &::after {
      content: '';
      position: absolute;
      top: 6rem;
      right: 0;
      width: calc(50% - 12rem);
      height: 0.1rem;
      border-bottom: 0.2rem solid #363a42;
      opacity: 0.4;
    }
  }
`;
