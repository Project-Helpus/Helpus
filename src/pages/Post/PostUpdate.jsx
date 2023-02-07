import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StWrapper, StButton } from "../../components/UI/StIndex";
import { __updatePost } from "../../redux/modules/postSlice";
import { address } from "../../asset/address";
import Calender from "./element/Calender";
import {
  StContainer,
  StBox,
  StBackBtn,
  StTitle,
  StCol,
  StLabel,
  StTextarea,
  StInnerBox,
  StCategory,
  StSelector,
  StRedFont,
  StTagContainer,
  StTag,
  StTagName,
  StTagButton,
  StRow,
} from "./element/styles/StPostUpdate";
const PostCreate = () => {
  const postInfo = useSelector((state) => state.postSlice.postInfo);
  const { state, city } = address;
  const [tags, setTags] = useState(
    !postInfo.tag ? [] : postInfo.tag.split(",")
  );
  const [tag, setTag] = useState("");
  const [date, setDate] = useState(
    !postInfo.appointed ? null : new Date(postInfo.appointed)
  );
  const [input, setInput] = useState({
    location1: `${postInfo?.location1}`,
    location2: `${postInfo?.location2}`,
  });

  const [location1, setLocation1] = useState(
    !postInfo?.location1 ? null : postInfo.location1
  );
  const [location2, setLocation2] = useState(
    !postInfo?.location2 ? null : postInfo.location2
  );

  const [titleInput, setTitleInput] = useState(postInfo.title);
  const [contentsInput, setContentsInput] = useState(postInfo.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const helpeeRef = useRef(null);
  const helperRef = useRef(null);
  const helpUsRef = useRef(null);

  const category = postInfo?.category;
  const [categories, setCategories] = useState(category);

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const changeHelpeeColor = (e) => {
    helpeeRef.current.style.backgroundColor = "#EA9DB4";
    helperRef.current.style.backgroundColor = "#F0F0F0";
    helpUsRef.current.style.backgroundColor = "#F0F0F0";
    setCategories(e.target.value);
  };
  const changeHelperColor = (e) => {
    helperRef.current.style.backgroundColor = "#EA9DB4";
    helpeeRef.current.style.backgroundColor = "#F0F0F0";
    helpUsRef.current.style.backgroundColor = "#F0F0F0";
    setCategories(e.target.value);
  };
  const changeHelpUsColor = (e) => {
    helpUsRef.current.style.backgroundColor = "#EA9DB4";
    helpeeRef.current.style.backgroundColor = "#F0F0F0";
    helperRef.current.style.backgroundColor = "#F0F0F0";
    setCategories(e.target.value);
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    let postData = {};
    let day;
    if (date) {
      day = date.toISOString();
      postData = { appointed: day };
    }
    if (tags?.length !== 0) {
      postData = { ...postData, tag: tags?.join() };
    } else {
      postData = { ...postData, tag: null };
    }
    if (location1) {
      postData = { ...postData, location1: location1 };
    }
    if (location2) {
      postData = { ...postData, location2: location2 };
    }
    postData = {
      ...postData,
      title: titleInput,
      content: contentsInput,
      category: categories,
    };
    const res = await dispatch(
      __updatePost({ data: postData, id: postInfo.postId })
    );
    if (res.payload === 201) {
      window.alert("게시물이 수정 되었습니다.");
      navigate(`/post/${postInfo.postId}`);
    } else if (res.payload === 400) {
      window.alert("제목, 내용, 카테고리 선택은 필수 입니다.");
    }
  };

  const removeTag = (i) => {
    const clonetags = tags.slice();
    clonetags.splice(i, 1);
    setTags(clonetags);
  };

  const addTag = (e) => {
    setTag(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tag !== "" && tag.length < 8) {
      setTags([...tags, tag]);
      setTag("");
    }
  };
  useEffect(() => {
    if (category === 1) {
      helpeeRef.current.style.backgroundColor = "#EA9DB4";
    } else if (category === 2) {
      helperRef.current.style.backgroundColor = "#EA9DB4";
    } else {
      helpUsRef.current.style.backgroundColor = "#EA9DB4";
    }
  }, []);

  return (
    <StWrapper>
      <StContainer>
        <StBox>
          <StBackBtn onClick={() => navigate(-1)} />
          <StTitle>게시글 수정</StTitle>
        </StBox>
        <StCol>
          <StLabel htmlFor="title">제목</StLabel>
          <input
            value={titleInput}
            name="title"
            id="title"
            onChange={(e) => setTitleInput(e.target.value)}
          ></input>
        </StCol>
        <StCol>
          <StLabel htmlFor="content">내용입력</StLabel>
          <StTextarea
            name="content"
            id="content"
            value={contentsInput}
            onChange={(e) => setContentsInput(e.target.value)}
          ></StTextarea>
        </StCol>
        <StBox>
          <StLabel htmlFor="date">날짜</StLabel>
          <StInnerBox>
            <Calender selectedDate={date} setDate={setDate} />
          </StInnerBox>
        </StBox>
        <StCol>
          <StInnerBox>
            <StLabel>카테고리 선택</StLabel>
            <StCategory value={1} ref={helpeeRef} onClick={changeHelpeeColor}>
              헬피
            </StCategory>
            <StCategory value={2} ref={helperRef} onClick={changeHelperColor}>
              헬퍼
            </StCategory>
            <StCategory value={3} ref={helpUsRef} onClick={changeHelpUsColor}>
              헬퍼스
            </StCategory>
            <span>(헬퍼스:단체 활동)</span>
          </StInnerBox>
        </StCol>
        <StCol>
          <StLabel>지역 설정</StLabel>
          <StBox>
            <StSelector name="location1" onChange={changeInputHandler}>
              <option value="">{postInfo.location1}</option>
              {state.map((el) => (
                <option key={el.state} value={el.codeNm}>
                  {el.codeNm}
                </option>
              ))}
            </StSelector>
            <StSelector name="location2" onChange={changeInputHandler}>
              <option value="">{postInfo.location2}</option>
              {city
                .filter((el) => el.state === input.location1)
                .map((el) => (
                  <option key={el.city} value={el.codeNm}>
                    {el.codeNm}
                  </option>
                ))}
            </StSelector>
          </StBox>
        </StCol>
        <StRedFont>사진수정은 불가능 합니다</StRedFont>
        <StCol>
          <StLabel htmlFor="tag">태그</StLabel>
          <StTagContainer>
            {tags?.map((e, i) => (
              <StTag key={i}>
                <StTagName>{e}</StTagName>
                <StTagButton onClick={() => removeTag(i)}>x</StTagButton>
              </StTag>
            ))}
          </StTagContainer>
          <input
            placeholder="태그를 입력해주세요"
            name="tag"
            id="tag"
            onChange={addTag}
            onKeyPress={(e) => handleKeyPress(e)}
            value={tag}
          />
        </StCol>
        <StRow>
          <StButton mode="pinkMdBtn" onClick={clickHandler}>
            수정
          </StButton>
          <StButton mode="outlineBtn" onClick={() => navigate(-1)}>
            뒤로가기
          </StButton>
        </StRow>
      </StContainer>
    </StWrapper>
  );
};

export default PostCreate;
