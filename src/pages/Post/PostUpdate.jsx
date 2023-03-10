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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postInfo = useSelector((state) => state.postSlice.postInfo);

  const category = postInfo?.category;
  const { state, city } = address;
  const helpeeRef = useRef(null);
  const helperRef = useRef(null);
  const helpUsRef = useRef(null);

  const [titleInput, setTitleInput] = useState(postInfo.title);
  const [contentsInput, setContentsInput] = useState(postInfo.content);
  const [date, setDate] = useState(
    !postInfo.appointed ? null : new Date(postInfo.appointed)
  );
  const [categories, setCategories] = useState(category);
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
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(
    !postInfo.tag ? [] : postInfo.tag.split(",")
  );

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

  const addTag = (e) => {
    setTag(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tag !== "" && tag.length < 8) {
      setTags([...tags, tag]);
      setTag("");
    }
  };
  const removeTag = (i) => {
    const clonetags = tags.slice();
    clonetags.splice(i, 1);
    setTags(clonetags);
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
      window.alert("???????????? ?????? ???????????????.");
      navigate(`/post/${postInfo.postId}`);
    } else if (res.payload === 400) {
      window.alert("??????, ??????, ???????????? ????????? ?????? ?????????.");
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
          <StTitle>????????? ??????</StTitle>
        </StBox>
        <StCol>
          <StLabel htmlFor="title">??????</StLabel>
          <input
            value={titleInput}
            name="title"
            id="title"
            onChange={(e) => setTitleInput(e.target.value)}
          ></input>
        </StCol>
        <StCol>
          <StLabel htmlFor="content">????????????</StLabel>
          <StTextarea
            name="content"
            id="content"
            value={contentsInput}
            onChange={(e) => setContentsInput(e.target.value)}
          ></StTextarea>
        </StCol>
        <StBox>
          <StLabel htmlFor="date">??????</StLabel>
          <StInnerBox>
            <Calender selectedDate={date} setDate={setDate} />
          </StInnerBox>
        </StBox>
        <StCol>
          <StInnerBox>
            <StLabel>???????????? ??????</StLabel>
            <StCategory value={1} ref={helpeeRef} onClick={changeHelpeeColor}>
              ??????
            </StCategory>
            <StCategory value={2} ref={helperRef} onClick={changeHelperColor}>
              ??????
            </StCategory>
            <StCategory value={3} ref={helpUsRef} onClick={changeHelpUsColor}>
              ?????????
            </StCategory>
            <span>(?????????:?????? ??????)</span>
          </StInnerBox>
        </StCol>
        <StCol>
          <StLabel>?????? ??????</StLabel>
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
        <StRedFont>??????????????? ????????? ?????????</StRedFont>
        <StCol>
          <StLabel htmlFor="tag">??????</StLabel>
          <StTagContainer>
            {tags?.map((e, i) => (
              <StTag key={i}>
                <StTagName>{e}</StTagName>
                <StTagButton onClick={() => removeTag(i)}>x</StTagButton>
              </StTag>
            ))}
          </StTagContainer>
          <input
            placeholder="????????? ??????????????????"
            name="tag"
            id="tag"
            onChange={addTag}
            onKeyPress={(e) => handleKeyPress(e)}
            value={tag}
          />
        </StCol>
        <StRow>
          <StButton mode="pinkMdBtn" onClick={clickHandler}>
            ??????
          </StButton>
          <StButton mode="outlineBtn" onClick={() => navigate(-1)}>
            ????????????
          </StButton>
        </StRow>
      </StContainer>
    </StWrapper>
  );
};

export default PostCreate;
