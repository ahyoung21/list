import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

const Message = ({ message, timeChain }) => {
  const name = useSelector((state) => state.user.name);
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (message.user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <MessageBox type={'END'}>
      {timeChain ? <span>{message.time}</span> : null}
      <div>
        <p>{message.text}</p>
      </div>
    </MessageBox>
  ) : (
    <MessageBox type={'START'}>
      <div>
        <p>{message.text}</p>
      </div>
      {timeChain ? <span>{message.time}</span> : null}
    </MessageBox>
  );
};

export default Message;

const MessageBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;

  div {
    display: inline-block;
    max-width: 80%;
    padding: 2.8rem 2.4rem;
    border-radius: 2.4rem;
  }

  p {
    width: 100%;
    letter-spacing: 0;
    font-size: 2.2em;
    line-height: 1.2;
    word-wrap: break-word;
  }

  span {
    margin: 0 0.8rem;
    padding-bottom: 0.8rem;
    font-size: 2.2rem;
    color: #363a42;
    opacity: 0.4;
    align-self: flex-end;
  }

  ${(props) =>
    props.type === 'START' &&
    css`
      justify-content: flex-start;
      color: #000;

      div {
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      }
    `}

  ${(props) =>
    props.type === 'END' &&
    css`
      justify-content: flex-end;
      color: #fff;

      div {
        background-color: #5b36ac;
        box-shadow: 0 2px 4px 0 rgba(91, 56, 177, 0.4);
      }
    `}
`;
