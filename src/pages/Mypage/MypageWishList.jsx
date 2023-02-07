import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { __getMyPage, __getMyposts } from "../../redux/modules/mypageSlice";
import styled from "styled-components";
import Card from "../../components/Card";
import arrow_forward_pink from "../../asset/arrow_forward_pink.svg";
import Rating from "./element/Rating";

const MypageWishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.mypageSlice?.profile);
  const wish = useSelector((state) => state.mypageSlice?.wish);
  const { userInfo } = useSelector((state) => state.userSlice);
  // const { isLoading } = useSelector((state) => state.mypageSlice);

  // const observerTarget = useRef(null);
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   let observer = new IntersectionObserver(
  //     (e, io) => {
  //       e.forEach((e) => {
  //         if (e.isIntersecting) {
  //           io.unobserve(e.target);
  //           setTimeout(() => {
  //             if (wish !== 0) {
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
  // }, [wish]);

  useEffect(() => {
    dispatch(__getMyPage());
    dispatch(__getMyposts());
  }, [dispatch]);

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
          <h2>찜한 목록</h2>
        </StMypageTitle>
        <StZZimWrap>
          {wish?.map((el, index) => (
            <Card type="찜 가로 게시물" data={el} key={index}></Card>
          ))}
          {/* {!isLoading && (
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

export default MypageWishList;

const StWarp = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  gap: 5%;
`;

const StMypage = styled.div`
  width: 55%;
`;

const Starrow = styled.div`
  margin: 48px;
  cursor: pointer;
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
  color: ${(props) => props.theme.colors.middleGray};
  margin-top: 12px;
`;
