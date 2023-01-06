import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import HelpUsFalse from './element/LocalFalse/HelpUsFalse';
import HelperFalse from './element/LocalFalse/HelperFalse';
import HelpeeFalse from './element/LocalFalse/HelpeeFalse';
import HelpUsTrue from './element/LocalTrue/HelpUsTrue';
import HelperTrue from './element/LocalTrue/HelperTrue';
import HelpeeTrue from './element/LocalTrue/HelpeeTrue';
import AllTrue from './element/LocalTrue/AllTrue';
import AllFalse from './element/LocalFalse/AllFalse';
import { setBoolHelper } from '../../redux/modules/postSlice';
import { Cookies } from 'react-cookie';
const PostList = () => {
  // const { helpUsRef, helperRef, helpeeRef } = useRef(null);
  const dispatch = useDispatch()

  const helpUsRef = useRef(null);
  const helperRef = useRef(null);
  const helpeeRef = useRef(null);
  const allRef = useRef(null);
  const locationRef = useRef(null)
  const cookie = new Cookies();


  const storeBoolHelper = useSelector((state) => state.postSlice.boolHelper)
  const storeBoolHelpee = useSelector((state) => state.postSlice.boolHelpee)
  const storeBoolAll = useSelector((state) => state.postSlice.boolAll)

  const [boolAll, setBoolAll] = useState(storeBoolAll)
  const [boolHelpUs, setBoollHelpUs] = useState(false);
  const [boolHelper, setBoollHelper] = useState(storeBoolHelper);
  const [boolHelpee, setBoollHelpee] = useState(storeBoolHelpee);
  const [boolLocation, setBoolLocation] = useState(false)

  const setBollAllTrue = () => {
    allRef.current.style.color = 'black'
    setBoolAll(true)
    setBoollHelpUs(false);
    setBoollHelper(false)
    setBoollHelpee(false)
    helpUsRef.current.style.color = 'blue'
    helpeeRef.current.style.color = 'blue'
    helperRef.current.style.color = 'blue'

  }

  const setBoollHelpUsTrue = () => {
    helpUsRef.current.style.color = 'black'
    setBoollHelpUs(true);
    setBoollHelper(false)
    setBoollHelpee(false)
    setBoolAll(false)
    helpeeRef.current.style.color = 'blue'
    helperRef.current.style.color = 'blue'
    allRef.current.style.color = 'blue'
  }
  const setBoollHelperTrue = () => {
    helperRef.current.style.color = 'black'
    setBoollHelpUs(false);
    setBoollHelper(true)
    setBoollHelpee(false);
    setBoolAll(false)
    helpeeRef.current.style.color = 'blue'
    helpUsRef.current.style.color = 'blue'
    allRef.current.style.color = 'blue'

  }
  const setBoollHelpeeTrue = () => {
    helpeeRef.current.style.color = 'black'
    setBoollHelpUs(false);
    setBoollHelper(false)
    setBoollHelpee(true)
    setBoolAll(false)
    helperRef.current.style.color = 'blue'
    helpUsRef.current.style.color = 'blue'
    allRef.current.style.color = 'blue'

  }

  const setBoolLocationTrue = () => {
    if (cookie.get('token') == undefined) { alert('로그인시 이용할 수 있습니다') }
    else {
      if (boolLocation === true) {
        setBoolLocation(false);
        locationRef.current.style.color = 'black'
      }
      else {
        locationRef.current.style.color = 'blue'
        setBoolLocation(true);
      }
    }
  }

  // useEffect(() => { console.log('us2:', helpUsRef.current) }, [boolHelpUs])
  return (
    <>
      <button>글쓰기</button>
      <StPostListWrapper >
        <StAll ref={allRef} onClick={setBollAllTrue} >전체</StAll>
        <StHelpUs ref={helpUsRef} onClick={setBoollHelpUsTrue}>헬퍼스 게시판</StHelpUs>
        <StHelper ref={helperRef} onClick={setBoollHelperTrue}>헬퍼 게시판</StHelper>
        <StHelpee ref={helpeeRef} onClick={setBoollHelpeeTrue}>헬피 게시판</StHelpee>
        <StLocation ref={locationRef} onClick={setBoolLocationTrue}>전국</StLocation>
      </StPostListWrapper>
      {boolLocation ? '로컬입니다' : '전체조회 입니다'}
      {boolLocation ? <>{boolAll ? <AllTrue /> : null}</> : <>{boolAll ? <AllFalse /> : null}</>}
      {boolLocation ? <>{boolHelpUs ? < HelpUsTrue /> : null}</> : <>{boolHelpUs ? <HelpUsFalse /> : null}</>}
      {boolLocation ? <>{boolHelper ? < HelperTrue /> : null}</> : <>{boolHelper ? <HelperFalse /> : null}</>}
      {boolLocation ? <>{boolHelpee ? <HelpeeTrue /> : null}</> : <>{boolHelpee ? <HelpeeFalse /> : null}</>}
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

color:blue;
`
const StHelper = styled.div`
color:blue;

`
const StHelpee = styled.div`
color:blue`

const StAll = styled.div`
color:blue;
`
const StLocation = styled.div`
color:blue;
`