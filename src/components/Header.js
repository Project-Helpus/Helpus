import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { __search } from '../redux/modules/postSlice';
const Header = () => {
  const [search, setSearch] = useState('')
  const boolean = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searching = (e) => {
    e.preventDefault();
    // dispatch(__search(search));
  }

  return (

    <StHeaderWrapper>
      <Stlogo onClick={() => { navigate('/') }}>로고</Stlogo>
      <form onSubmit={searching}>
        <StSearch placeholder='Search' type='text' value={search} onChange={(e) => { setSearch(e.target.value) }}></StSearch>
      </form>
      {boolean ?
        (<>
          <StSignWrapper>
            <StSignIn>로그인</StSignIn>
            <StSignUp>회원가입</StSignUp>
          </StSignWrapper>
        </>)
        :
        (<>
          <StLogedIn>
            <StPropile></StPropile>{'닉네임'}
          </StLogedIn>
        </>)
      }
    </StHeaderWrapper >

  );
};

const StHeaderWrapper = styled.header`
  width: 100%;
  height: 6em;
  align-items: center;
  top: 0;
  display: flex;
  justify-content: space-between;
  z-index:1;
  /* background-color: white; */
`;

export default Header;

const Stlogo = styled.div`
border:2px solid #000;
margin-left:10em;
`
const StSearch = styled.input`
width:50em;
&::-webkit-input-placeholder{text-align:center};
`
const StSignWrapper = styled.div`
display:flex;
margin-right:10em;
`
const StSignIn = styled.div`
padding-right:20px;
border-right:2px solid #000;
`
const StSignUp = styled.div`
margin-left:20px;
`
//    <  로그인 후  >
const StLogedIn = styled.div`
display:flex;
`
const StPropile = styled.div`
width:26px;
border:2px solid #000;
border-radius:50%;
`