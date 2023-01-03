import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getHelper, __getHelpee } from "../../redux/modules/mypageSlice";
import { useSelector } from "react-redux";
import Card from "../../components/UI/Card";
import imageA from '../Home/element/image/A.jpg'
import imageB from '../Home/element/image/B.jpg'

const CardList = () => {

  const dispatch = useDispatch();
  // const real = useSelector((state) => state.mypageSlice);
  // console.log('real', real)


  const Mok = {
    'result': [
      {
        'postId': 1,
        'title': '반려견 봐드립니다',
        'category': 1,
        'content': '하루 이틀 저희집 강아지들과 함께 따뜻하게 돌봐드릴게요',
        'location1': '서울특별시',
        'location2': '구로구',
        'createdAt': '2023 - 01 - 01 12: 12',
        'imageUrl': imageA,
        'userName': '세로군'
      },
      {
        'postId': 2,
        'title': '사진촬영 해드려요',
        'category': 1,
        'content': '인물사진,음식시간,인테리어 사진 잘 찍어드릴게요',
        'location1': '부산광역시',
        'location2': '광안리',
        'createdAt': '2022 - 12 - 31 12: 12',
        'imageUrl': imageB,
        'userName': '지원님 잘생겼어요'
      },]
  }


  // useEffect(dispatch(__getHelpee, __getHelper), [dispatch]);

  return (<>
    <StContainer>
      <StFlex>
        <StHelper>
          <StFlex><p>헬퍼 게시물</p><p>글쓰기</p></StFlex>
          {Mok.result.map((item) => { return <StItem key={item.postId}><Card type={"세로"} data={item} /></StItem> })}
          <StLink to={'/postlist'}>더보기</StLink>
        </StHelper>
        <StHelpee>
          <StFlex><p>헬피 게시물</p><p>글쓰기</p></StFlex>
          {Mok.result.map((item) => { return <StItem key={item.postId}><Card type={"세로"} data={item} /></StItem> })}
          <StLink to={'/postlist'}>더보기</StLink>
        </StHelpee>
      </StFlex>
    </StContainer>
  </>

  )
}
export default CardList;

const StContainer = styled.div`
  height:50em;
  width:90%;
  margin:auto;
`
const StFlex = styled.div`
display:flex;`

const StHelper = styled.div`
border:1px solid #000;
width:50%;
height:50em;
`
const StHelpee = styled.div`
border:1px solid #000;
width:50%;
height:50em;

`
const StLink = styled(Link)`
text-decoration:none;
&:visited{color:#000;}
display:block;
width:100%;
text-align:center;
  height:10%;
`
const StItem = styled.div`
  width:24em;
  height:14em;
  border:1px solid #000;
`