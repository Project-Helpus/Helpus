import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HelpUs from './element/HelpUs';
import Helper from './element/Helper';
import Helpee from './element/Helpee';
import { useSelector } from 'react-redux';
const PostList = () => {
  // const { helpUsRef, helperRef, helpeeRef } = useRef(null);
  const helpUsRef = useRef(null);


  console.log('us:', helpUsRef.current)

  const storeBoolHelper = useSelector((state) => state.postSlice.boolHelper)
  const storeBboolHelpee = useSelector((state) => state.postSlice.boolHelpee)
  const [boolHelpUs, setBoollHelpUs] = useState(false);
  const [boolHelper, setBoollHelper] = useState(storeBoolHelper);
  const [boolHelpee, setBoollHelpee] = useState(storeBboolHelpee);


  const setBoollHelpUsTrue = () => {
    setBoollHelpUs(true);
    setBoollHelper(false)
    setBoollHelpee(false)
  }
  const setBoollHelperTrue = () => {
    setBoollHelpUs(false);
    setBoollHelper(true)
    setBoollHelpee(false)
  }
  const setBoollHelpeeTrue = () => {
    console.log('작동')
    setBoollHelpUs(false);
    setBoollHelper(false)
    setBoollHelpee(true)
  }

  // useEffect(() => { console.log('us2:', helpUsRef.current) }, [boolHelpUs])
  return (
    <>
      <button>글쓰기</button>
      <StPostListWrapper ref={helpUsRef} >
        <StHelpUs onClick={setBoollHelpUsTrue}>헬퍼스 게시판</StHelpUs>
        <div onClick={setBoollHelperTrue}>헬퍼 게시판</div>
        <div onClick={setBoollHelpeeTrue}>헬피 게시판</div>
        <div>전국</div>
      </StPostListWrapper>
      {boolHelpUs ? <HelpUs /> : null}
      {boolHelper ? <Helper /> : null}
      {boolHelpee ? <Helpee /> : null}
    </>
  );
};

export default PostList;

const StPostListWrapper = styled.div`
display:flex;
margin:3em auto 3em auto;
div{margin-right:3em;
  border-bottom:2px solid #000;}`

const StHelpUs = styled.div`
color:red;`