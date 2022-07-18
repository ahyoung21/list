import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import IcoPrev from '../images/ico_back@3x.png';
import IcoUpload from '../images/ico_upload@3x.png';
import IcoSearch from '../images/ico_search@3x.png';
import IcoMenu from '../images/ico_menu@3x.png';
import IcoPerson from '../images/ico_person@3x.png';

function Header({ title, type, handleUpoladOpen }) {
  const room = useSelector((state) => state.user.room);

  return (
    <HeaderBox>
      {type === 'List' ? (
        <>
          <button>
            <img src={IcoMenu} />
          </button>
          <h2>{title}</h2>
          <div>
            <button>
              <img src={IcoPerson} />
            </button>
          </div>
        </>
      ) : (
        <>
          <Link
            to={{
              pathname: `/list/`,
            }}
          >
            <img src={IcoPrev} />
          </Link>
          <h2>{room}</h2>
          <div>
            <button onClick={handleUpoladOpen}>
              <img src={IcoUpload} />
            </button>
            <button>
              <img src={IcoSearch} />
            </button>
          </div>
        </>
      )}
    </HeaderBox>
  );
}

export default Header;

const HeaderBox = styled.header`
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  padding: 2.2rem;
  background: #5b36ac;

  button,
  a {
    width: 4.8rem;
    height: 4.8rem;
    padding: 0;
    cursor: pointer;

    & + button {
      margin-left: 2.4rem;
    }
  }

  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3.6rem;
    color: #fff;
  }
`;
