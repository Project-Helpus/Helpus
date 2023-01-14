import styled from "styled-components";
import topImg from '../../../asset/top.jpg';
import arrowLeft from '../../../asset/arrowLeft.svg';
import arrowRight from '../../../asset/arrowRight.svg'

export const StMainWrapper = styled.div`
width:1920px;
margin:auto;`

export const StTopImg = styled.div`
height:540px;
width:inherit;
position:relative;
z-index:-1;
top:-6em;
background:linear-gradient(
to bottom,
rgba(0, 0, 0, 0) 60%,
rgba(255, 255, 255, 0.2) 70%,
rgba(255, 255, 255, 0.4) 75%,
rgba(255, 255, 255, 0.6) 80%,
rgba(255, 255, 255, 0.7) 85%,
rgba(255,255,255,0.8) 90%,
rgba(255,255,255,0.93) 100%
),url(${topImg});
background-size:100% 100%;
`
export const StTitleWrapper = styled.div`
top:32%;
left:4%;
position:absolute;
`
export const StTopTitle = styled.h1`
font-size:48px;
font-weight:700;
color: #fff;
margin:0;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.65);
`
export const StTopSubTilte = styled.h2`
font-size:36px;
font-weight:400;
color: #fff;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.65);
`
export const StTransFormY = styled.div`
transform:translateY(-220px)
`
export const StMain = styled.div`
width:1840px;
margin:auto;
`
export const StCarouselWrapper = styled.div`
margin:0 auto 40px auto;
position:relative;
`
export const StCarouselTitle = styled.h2`
font-size:24px;
height:29px;
background-color:#fff;
width:373px;
margin:0 0 10px 40px;
cursor: pointer;
`
export const StSubTitle = styled.div`
font-size:12px;
display:inline-block;
margin-left:10px;
cursor: pointer;
`
export const StCarouselContainer = styled.div`
display:flex;
overflow:hidden;
position:relative;
margin:0 15px 0 25px;
padding-left:370px;
`

export const StLeftButton = styled.button`
width:25px;
height:30px;
position:absolute;
background-color:transparent;
background-image:url(${arrowLeft});
background-size:cover;
border:none;
top:40%;
`

export const StRightButton = styled.button`
width:25px;
height:30px;
position:absolute;
right:0;
background-color:transparent;
background-image:url(${arrowRight});
background-size:cover;
border:none;
top:40%;
`
export const StCarousel = styled.div`
/* z-index:-1; */
display:flex;
`
export const StCarouselItem = styled.div`
margin-right:20px;
`
