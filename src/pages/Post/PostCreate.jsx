import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StWrapper, StButton } from "../../components/UI/StIndex";
import { __createPost } from "../../redux/modules/postSlice";

import { 행정구역 } from "./elements/address";
import Category from "./elements/Category";
import { categoryType } from "./elements/categoryType";
import Calender from "./elements/Calender";

const PostCreate = () => {
  const { state, city } = 행정구역;
  const [getImg, setGetImg] = useState(false);
  const [previewImg, setPreviewImg] = useState();
  const [img, setImg] = useState([]);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [date, setDate] = useState();
  const [input, setInput] = useState({
    title: "",
    content: "",
    category: 0,
    location1: "",
    location2: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeInputHandler = e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const changeImgHandler = e => {
    const file = e.target.files;
    const fileUrl = [];

    // file count
    if (file.length > 3) {
      alert("최대 3개 첨부 가능합니다");
      return;
    }

    // file reader
    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        fileUrl[i] = reader.result;
        setPreviewImg([...fileUrl]);
      };
      reader.readAsDataURL(file[i]);
    }

    setImg(file);
    setGetImg(true);
  };

  const clickHandler = e => {
    e.preventDefault();

    const formData = new FormData();

    for (const property in input) {
      formData.append(`${property}`, input[property]);
    }
    for (let i = 0; i < img.length; i++) {
      formData.append("post-image", img[i]);
    }
    const day = date.toISOString();

    formData.append("appointed", day);
    formData.append("tag", tags);
    dispatch(__createPost(formData));
  };

  const removeTag = i => {
    const clonetags = tags.slice();
    clonetags.splice(i, 1);
    setTags(clonetags);
  };

  const addTag = e => {
    setTag(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter" && tag !== "" && tag.length < 8) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  return (
    <StWrapper>
      <StContainer>
        <StTitle>게시글 작성</StTitle>
        <label htmlFor="title">제목</label>
        <input
          name="title"
          id="title"
          placeholder="제목 입력하시오"
          onChange={changeInputHandler}
        ></input>
        <label htmlFor="content">내용입력</label>
        <StTextarea
          name="content"
          id="content"
          placeholder="내용을 입력하시오."
          onChange={changeInputHandler}
        ></StTextarea>
        <label htmlFor="date">날짜</label>
        <Calender value={date} setDate={setDate} />
        <label>카테고리 선택</label>
        <StInnerContainer>
          {categoryType.map((el, id) => (
            <Category
              key={id}
              value={id + 1}
              changeInputHandler={changeInputHandler}
            >
              {el}
            </Category>
          ))}
          <div>(헬퍼스:단체 봉사 활동)</div>
        </StInnerContainer>
        {getImg ? (
          <label htmlFor="image">
            사진 첨부(첫번째 이미지는 썸네일로 사용됩니다. 이미지가 없다면 임의
            사진으로 대체 됩니다.)
          </label>
        ) : (
          <label htmlFor="image">
            사진 첨부(최소 1장의 이미지를 반드시 첨부 해 주세요)
          </label>
        )}
        <input
          style={{ display: "none" }}
          accept="image/jpg, image/png, image/gif"
          id="image"
          name="image"
          type="file"
          onChange={changeImgHandler}
          multiple
        />
        <StGroupImgs>
          {previewImg ? (
            previewImg.map((el, i) => (
              <label htmlFor="image" key={i}>
                <StImg src={el} alt="inputImage" />
              </label>
            ))
          ) : (
            <StGroupImgs>
              <StImgButton htmlFor="image">+</StImgButton>
              <StImgButton htmlFor="image">+</StImgButton>
              <StImgButton htmlFor="image">+</StImgButton>
            </StGroupImgs>
          )}
        </StGroupImgs>
        <label>지역 설정</label>
        <div>
          <select name="location1" onChange={changeInputHandler}>
            <option value="">선택</option>
            {state.map(el => (
              <option key={el.state} value={el.codeNm}>
                {el.codeNm}
              </option>
            ))}
          </select>
          <select name="location2" onChange={changeInputHandler}>
            <option value="">선택</option>
            {city
              .filter(el => el.state === input.location1)
              .map(el => (
                <option key={el.city} value={el.codeNm}>
                  {el.codeNm}
                </option>
              ))}
          </select>
        </div>
        <label htmlFor="tag">태그</label>
        <StTagContainer>
          {tags.map((e, i) => (
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
          onKeyPress={e => handleKeyPress(e)}
          value={tag}
        />
        <StInnerContainer>
          <StButton mode="smpr" onClick={clickHandler}>
            게시
          </StButton>
          <StButton mode="smsd" onClick={() => navigate(-1)}>
            뒤로가기
          </StButton>
        </StInnerContainer>
      </StContainer>
    </StWrapper>
  );
};

const StTitle = styled.h2`
  text-align: center;
`;

const StContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: rgb(240, 240, 240);
`;

const StInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const StTextarea = styled.textarea`
  resize: none;
`;

const StTagContainer = styled.div`
  display: flex;
  width: 590px;
  flex-flow: row wrap;
`;

const StGroupImgs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const StImgButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 120px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
`;

const StImg = styled.img`
  border-radius: 10px;
  width: 190px;
  height: 120px;
  cursor: pointer;
`;

const StTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-right: 10px;
  background-color: orange;
`;

const StTagName = styled.h3`
  margin-right: 10px;
`;

const StTagButton = styled.button`
  border: none;
  outline: 0;
  border-radius: 50%;
  width: 20px;
  background-color: lightgray;
  cursor: pointer;
`;

export default PostCreate;
