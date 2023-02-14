import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { __getMyPage, __getMyposts } from "../../redux/modules/mypageSlice";
import Card from "../../components/Card";
import arrow_forward_pink from "../../asset/arrow_forward_pink.svg";
import Rating from "./element/Rating";
import {
  StWarp,
  Starrow,
  StMypage,
  StProfile,
  StProfileImg,
  StZZimWrap,
  StMypageTitle,
  StName,
  StEmail,
  StState,
} from "../Mypage/Style/StMyProfile";

const MypagePostsDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.mypageSlice.profile);
  const myPosts = useSelector((state) => state.mypageSlice.myPosts);

  const { userInfo } = useSelector((state) => state.userSlice);

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
        </StZZimWrap>
      </StMypage>
    </StWarp>
  );
};

export default MypagePostsDetail;
