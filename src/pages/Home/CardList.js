import { useDispatch, useSelector } from "react-redux";
import {
  __setBoolHelpee,
  __setBoolHelper,
  __getHelperFalse,
  __getHelpeeFalse,
} from "../../redux/modules/postSlice";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import Card from "../../components/Card";
import {
  StContainer,
  StFlex,
  StTitle,
  StHelpee,
  StHelper,
  StSubTitle,
} from "./Style/StCardList";

const CardList = () => {
  const HelperData = useSelector(
    (state) => state.postSlice.helperFalseDate.result
  );
  const HelpeeData = useSelector(
    (state) => state.postSlice.helpeeFalseDate.result
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HelperRef = useRef(null);
  const HelpeeRef = useRef(null);
  const HelperArr = HelperData?.slice(0, 10);
  const HelpeeArr = HelpeeData?.slice(0, 10);

  const onMouseOverHandlerHelper = () => {
    HelperRef.current.style.color = "#7C7C7C";
    HelperRef.current.style.backgroundColor = "pink";
  };
  const onMouseOutHandlerHelper = () => {
    HelperRef.current.style.color = "pink";
  };
  const onMouseOverHandlerHelpee = () => {
    HelpeeRef.current.style.color = "#7C7C7C";
    HelpeeRef.current.style.backgroundColor = "pink";
  };
  const onMouseOutHandlerHelpee = () => {
    HelpeeRef.current.style.color = "pink";
  };

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
    <StContainer>
      <StFlex>
        <StHelper>
          <StTitle
            onClick={linkHelper}
            onMouseOver={onMouseOverHandlerHelper}
            onMouseOut={onMouseOutHandlerHelper}
          >
            재능을 기부합니다 Helper
            <StSubTitle ref={HelperRef} onClick={linkHelper}>
              더보기
            </StSubTitle>
          </StTitle>
          {HelperArr?.map((item, idx) => {
            return <Card type={"메인"} data={item} key={idx} />;
          })}
        </StHelper>
        <StHelpee>
          <StTitle
            onClick={linkHelpee}
            onMouseOver={onMouseOverHandlerHelpee}
            onMouseOut={onMouseOutHandlerHelpee}
          >
            도움을 기다려요 Helpee
            <StSubTitle ref={HelpeeRef} onClick={linkHelpee}>
              더보기
            </StSubTitle>
          </StTitle>
          {HelpeeArr?.map((item, idx) => {
            return <Card type={"메인"} data={item} key={idx} />;
          })}
        </StHelpee>
      </StFlex>
    </StContainer>
  );
};
export default CardList;
