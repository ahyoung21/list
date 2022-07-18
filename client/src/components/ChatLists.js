import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import theme from '../common/theme';

import Header from './Header';
import ChatData from '../data/ChatList.json';

const ChatLists = () => {
  const [nowTime, setNowTime] = useState(null);

  function timeCheck(nowTime, targetTime) {
    const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    let gapSec = (new Date(nowTime) - new Date(targetTime)) / 1000;

    if (gapSec > 86400) {
      return WEEKDAY[new Date(targetTime).getDay()];
    } else if (gapSec <= 86400) {
      return (
        (Number(targetTime.split(' ')[1].split(':')[0]) >= 12 ? '오후 ' : '오전') +
        (Number(targetTime.split(' ')[1].split(':')[0]) > 12
          ? Number(targetTime.split(' ')[1].split(':')[0]) - 12
          : Number(targetTime.split(' ')[1].split(':')[0])) +
        ':' +
        targetTime.split(' ')[1].split(':')[1]
      );
    }
  }

  useEffect(() => {
    setNowTime(new Date());
  }, []);

  return (
    <ChatListSection>
      <Inner>
        <ChatListBox>
          <Header title={'채팅'} type={'List'} />
          <ChatList>
            {ChatData &&
              ChatData.map((chat, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      to={{
                        pathname: `/room/${chat.userId}`,
                        state: {
                          name: String(new Date()), // 임의로 유저를 분리하기 위해 겹치지않게 시간을 넣어둠
                          room: chat.userId,
                        },
                      }}
                    >
                      <ThumbItem>
                        <img src={`${process.env.PUBLIC_URL}${chat.thumbNailPath}`} />
                      </ThumbItem>
                      <ChatInfoBox>
                        <strong>{chat.userId}</strong>
                        <p>{chat.lastChat}</p>
                      </ChatInfoBox>
                      <ChatStateBox>
                        <span>
                          {timeCheck(
                            nowTime,
                            chat.lastChatDateTime.replace('-', '/').replace('-', '/')
                          )}
                        </span>
                        {chat.isRead === 'N' && <i>{chat.chatNum}</i>}
                      </ChatStateBox>
                    </Link>
                  </li>
                );
              })}
          </ChatList>
        </ChatListBox>
      </Inner>
    </ChatListSection>
  );
};

export default ChatLists;

const CardSlide = keyframes`
  from{opacity:0; transform: translateX(-6rem);}
  to{opacity:1; transform: translateX(0rem);}
`;

const ThumSlide = keyframes`
  from{opacity:0; transform: translateX(-3rem);}
  to{opacity:1; transform: translateX(0rem);}
`;

const ChatListSection = styled.section`
  height: 100vh;
`;

const Inner = styled.div`
  display: flex;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;
`;

const ChatListBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  background-color: #fff;
`;

const ChatList = styled.ul`
  padding: 2rem 0;
  animation: ${CardSlide} 1.2s forwards;

  a {
    display: flex;
    align-items: center;
    position: relative;
    padding: 2rem 3rem;
    z-index: 10;
  }
`;

const ThumbItem = styled.span`
  width: 11.4rem;
  height: 11.4rem;
  flex: 0 0 auto;
  align-self: center;
  margin-right: 3rem;
  border-radius: 50%;
  overflow: hidden;
  animation: ${ThumSlide} 1.2s forwards;
`;

const ChatInfoBox = styled.div`
  flex: 1 1 auto;

  strong {
    display: block;
    font-weight: 700;
    font-size: 3.5rem;
    color: ${theme.colors.charcoalGrey};
  }

  p {
    display: -webkit-box;
    margin-top: 1.5rem;
    font-size: 2.5rem;
    color: ${theme.colors.coolGrey};
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    white-space: normal;
    line-height: 1.3;
  }
`;

const ChatStateBox = styled.div`
  flex: 0 0 auto;
  margin-top: 2rem;
  align-self: flex-start;
  text-align: right;

  span {
    display: block;
    font-size: 2rem;
    color: #363a42;
    opacity: 0.4;
  }

  i {
    display: inline-block;
    min-width: 3.6rem;
    height: 3.6rem;
    margin-top: 1.8rem;
    line-height: 3.6rem;
    padding: 0 1.2rem;
    font-size: 2.2rem;
    color: #fff;
    background-color: #5b36ac;
    border-radius: 2.2rem;
    text-align: center;
  }
`;
