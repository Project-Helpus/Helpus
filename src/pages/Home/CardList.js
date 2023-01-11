import styled from "styled-components";
import { useDispatch ,useSelector} from "react-redux";
import {
  __setBoolHelpee,
  __setBoolHelper,
  __getHelperFalse,
  __getHelpeeFalse,
} from "../../redux/modules/postSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Card from "../../components/Card";

const CardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HelperData = useSelector((state) => state.postSlice.helperFalseDate.result);
  const HelpeeData = useSelector((state)=>state.postSlice.helpeeFalseDate.result)
  console.log('헬퍼:',HelperData)
  console.log('헬피:',HelpeeData)

  const HelpeeArr = HelpeeData?.slice(0, 10)
  console.log('new:', HelpeeArr)
  const HelperArr = HelperData?.slice(0,10)

  const linkHelper = () => {
    dispatch(__setBoolHelper());
    navigate("/postlist");
  };

  const linkHelpee = () => {
    dispatch(__setBoolHelpee());
    navigate("/postlist");
  };

  useEffect(() => {
    dispatch(__getHelperFalse(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(__getHelpeeFalse(""));
  }, [dispatch]);




  return (
    <>
      <StContainer>
        <StFlex>
          <StHelper>
            <StFlex>
              <StFlex><p>재능을 기부합니다~ Helper</p>
            <StLink onClick={linkHelper}>더보기</StLink>
                </StFlex>
              {HelperData?.map((item, idx) => {return<Card type={"메인"} data={item} key={idx} /> })}
            </StFlex>
          </StHelper>
          <StHelpee>
            <StFlex>
              <StFlex><p>도움을 기다려요~ Helpee</p>
            <StLink onClick={linkHelpee}>더보기</StLink>
              </StFlex>
            </StFlex>
            <StItem>
              {HelpeeArr?.map((item, idx) => { return < Card type={"메인"} data={item} key={idx} /> } )}
            </StItem>
          </StHelpee>
        </StFlex>
      </StContainer>
    </>
  );
};
export default CardList;

const StContainer = styled.div`
  height: 50em;
  width: 90%;
  margin: auto;
`;
const StFlex = styled.div`
  display: flex;
`;

const StHelper = styled.div`
  border: 1px solid #000;
  width: 50%;
  height: 50em;
`;
const StHelpee = styled.div`
  border: 1px solid #000;
  width: 50%;
  height: 50em;
`;
const StLink = styled.div`
  /* text-decoration:none; */
  /* &:visited{color:#000;} */
  display: block;
  width: 100%;
  text-align: center;
  height: 10%;
`;
const StItem = styled.div`
  width: 30em;
  height: 25em;
  border: 1px solid #000;
`;
