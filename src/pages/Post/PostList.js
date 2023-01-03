import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import HelpUs from './element/HelpUs';
import Helper from './element/Helper';
import Helpee from './element/Helpee';
import { setBoolHelper } from '../../redux/modules/postSlice';
const PostList = () => {
  // const { helpUsRef, helperRef, helpeeRef } = useRef(null);
  const helpUsRef = useRef(null);
  const helperRef = useRef(null);
  const helpeeRef = useRef(null);
  const dispatch = useDispatch()



  const storeBoolHelper = useSelector((state) => state.postSlice.boolHelper)
  const storeBboolHelpee = useSelector((state) => state.postSlice.boolHelpee)
  const [boolHelpUs, setBoollHelpUs] = useState(false);
  const [boolHelper, setBoollHelper] = useState(storeBoolHelper);
  const [boolHelpee, setBoollHelpee] = useState(storeBboolHelpee);


  // console.log('us:', helpUsRef)
  const setBoollHelpUsTrue = () => {
    helpUsRef.current.style.color = 'black'

    setBoollHelpUs(true);
    setBoollHelper(false)
    setBoollHelpee(false)
    helpeeRef.current.style.color = 'red'
    helperRef.current.style.color = 'red'

    // console.log(setBoollHelpUs)
  }
  const setBoollHelperTrue = () => {
    helperRef.current.style.color = 'black'
    setBoollHelpUs(false);
    setBoollHelper(true)
    setBoollHelpee(false);
    helpeeRef.current.style.color = 'red'
    helpUsRef.current.style.color = 'red'

  }
  const setBoollHelpeeTrue = () => {
    helpeeRef.current.style.color = 'black'
    setBoollHelpUs(false);
    setBoollHelper(false)
    setBoollHelpee(true)
    helperRef.current.style.color = 'red'
    helpUsRef.current.style.color = 'red'

  }

  // useEffect(() => { console.log('us2:', helpUsRef.current) }, [boolHelpUs])
  return (
    <>
      <button>글쓰기</button>
      <StPostListWrapper >

        <StHelpUs ref={helpUsRef} onClick={setBoollHelpUsTrue}>헬퍼스 게시판</StHelpUs>
        <StHelper ref={helperRef} onClick={setBoollHelperTrue}>헬퍼 게시판</StHelper>
        <StHelpee ref={helpeeRef} onClick={setBoollHelpeeTrue}>헬피 게시판</StHelpee>
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

color:red;
`
const StHelper = styled.div`
color:red;

`
const StHelpee = styled.div`
color:red`