import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { __getMyPage, __getMyposts } from "../../redux/modules/mypageSlice";
import styled from "styled-components";
import Card from "../../components/Card";
import arrow_forward_pink from "../../asset/arrow_forward_pink.svg";
import Rating from "./element/Rating";

const MypagePostsDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.mypageSlice.profile);
  const myPosts = useSelector((state) => state.mypageSlice.myPosts);

  const { userInfo } = useSelector((state) => state.userSlice);
  const { isPostLoading } = useSelector((state) => state.mypageSlice);

  const observerTarget = useRef(null);
  const [count, setCount] = useState();

  // useEffect(() => {
  //   let observer = new IntersectionObserver(
  //     (e, io) => {
  //       e.forEach((e) => {
  //         if (e.isIntersecting) {
  //           io.unobserve(e.target);
  //           setTimeout(() => {
  //             if (myPosts !== 0) {
  //               dispatch(__getMyposts(count));
  //               setCount((prev) => prev + 6);
  //             }
  //           }, 300);
  //         }
  //       });
  //     },
  //     { threshold: 0.5 }
  //   );
  //   if (observerTarget.current) observer.observe(observerTarget.current);
  //   return () => observer.disconnect();
  // }, [myPosts]);

  useEffect(() => {
    dispatch(__getMyPage());
    dispatch(__getMyposts());
  }, []);

  return (
    <StWarp>
      <Starrow>
        <img
          src={arrow_forward_pink}
          alt=""
          onClick={() => {
            navigate("/mypage");
          }}
        ></img>
      </Starrow>
      <StProfile>
        <StProfileImg src={profile?.userImage} alt="" />
        <StName>{userInfo?.userName}</StName>
        <StEmail>{profile?.email}</StEmail>
        <Rating></Rating>
        <StState>
          {userInfo?.state1} {userInfo?.state2}
        </StState>
      </StProfile>
      <StMypage>
        <StMypageTitle>
          <h2>활동 이력</h2>
        </StMypageTitle>
        <StZZimWrap>
          {myPosts?.map((el, index) => (
            <Card type="내 게시물 가로" data={el} key={index}></Card>
          ))}
          {/* {!isPostLoading && (
            <div
              ref={observerTarget}
              style={{
                height: "1px",
                width: "100%",
              }}
            ></div>
          )} */}
        </StZZimWrap>
      </StMypage>
    </StWarp>
  );
};

export default MypagePostsDetail;

const StWarp = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  gap: 5%;
`;

const Starrow = styled.div`
  margin: 48px;
  cursor: pointer;
`;
const StMypage = styled.div`
  width: 55%;
`;

const StProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  text-align: center;
  margin-top: 100px;
  span {
    margin-top: 17px;
  }
  button {
    margin: 10px auto;
    width: 120px;
    height: 40px;
    background-color: ${(props) => props.theme.colors.subPink};
    border: none;
    border-radius: 7px;
    color: white;
  }
`;

const StProfileImg = styled.img`
  margin: 0 auto;
  width: 120px;
  height: 120px;
  border-radius: 100px;
  border: 2px solid #f5f5f5;
`;

const StZZimWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
`;

const StMypageTitle = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 100px;
  margin-bottom: 20px;
  h2 {
    color: ${(props) => props.theme.colors.subPink};
    padding-right: 10px;
    letter-spacing: -0.03em;
    font-weight: 600;
  }
  span {
    color: ${(props) => props.theme.colors.middleGray};
    font-size: 14px;
  }
`;

const StName = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 18px;
`;

const StEmail = styled.div`
  font-size: 1em;
  margin-top: 12px;
  color: ${(props) => props.theme.colors.middleGray};
`;

const StState = styled.div`
  color: ${(props) => props.theme.colors.subPink};
  margin-top: 12px;
`;
