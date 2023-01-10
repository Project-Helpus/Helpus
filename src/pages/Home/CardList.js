import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __setBoolHelpee, __setBoolHelper } from "../../redux/modules/postSlice";
import { useNavigate } from "react-router";


const CardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkHelper = () => {
    dispatch(__setBoolHelper());
    navigate('/postlist')

  }
  const linkHelpee = () => {
    dispatch(__setBoolHelpee())
    navigate('/postlist')

  }


  return (<>
    <StContainer>
      <StFlex>
        <StHelper>
          <StFlex><p>헬퍼 게시물</p><p>글쓰기</p></StFlex>
          <StLink onClick={linkHelper}>더보기</StLink>
        </StHelper>
        <StHelpee>
          <StFlex><p>헬피 게시물</p><p>글쓰기</p></StFlex>
          <StItem></StItem>
          <StLink onClick={linkHelpee}>더보기</StLink>
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
const StLink = styled.div`
/* text-decoration:none; */
/* &:visited{color:#000;} */
display:block;
width:100%;
text-align:center;
  height:10%;
`
const StItem = styled.div`
  width:30em;
  height:25em;
  border:1px solid #000;
`