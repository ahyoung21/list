import React from 'react';
import styled from 'styled-components';
import theme from '../common/theme';

import IcoMessage from '../images/ico_send@3x.png';

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <InputBox>
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      <button onClick={(e) => sendMessage(e)}>
        <span>메시지 전송</span>
      </button>
    </InputBox>
  );
};
export default Input;

const InputBox = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 18rem;
  padding: 4rem 3rem;

  input {
    flex: 0 1 auto;
    height: 10rem;
    border: none;
    border-radius: 5rem;
    padding: 3rem;
    width: 80%;
    font-size: 2.2rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    color: ${theme.colors.battleshipGrey};
  }

  button {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background: #5b36ac url(${IcoMessage}) 50% 50% no-repeat;
    background-size: 58% auto;
    cursor: pointer;

    span {
      position: absolute;
      overflow: hidden;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
    }
  }
`;
