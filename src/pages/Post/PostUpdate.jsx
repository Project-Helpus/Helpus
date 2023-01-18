import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StWrapper, StButton } from "../../components/UI/StIndex";
import {__updatePost } from "../../redux/modules/postSlice";
import { 행정구역 } from "./elements/address";
import Calender from "./elements/Calender";
import { element } from "prop-types";

const PostCreate = () => {
  const userInfo = useSelector((state) => state.postSlice.postInfo)
  const { state, city } = 행정구역;
  const tagData = userInfo.tag?.split(',')
  const [tags, setTags] = useState(tagData);
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(new Date(userInfo.appointed));
  const [input, setInput] = useState({
    location1: `${userInfo.location1}`,
    location2: `${userInfo.location2}`,
  });
  const [titleInput, setTitleInput] = useState(userInfo.title)
  const [contentsInput, setContentsInput] = useState(userInfo.content)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const helpeeRef = useRef(null)
  const helperRef = useRef(null)
  const helpUsRef = useRef(null)
  const [img, setImg1] = useState()
  const [img2, setImg2] = useState()
  const [img3, setImg3] = useState()
  const [pr, setPrImg1] = useState(userInfo.imageUrl1)
  const [pr2, setPrImg2] = useState(userInfo.imageUrl2)
  const [pr3, setPrImg3] = useState(userInfo.imageUrl3)
  
  const category = userInfo.category;
  const [categories, setCategories] = useState(category)

  const changeInputHandler = e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const changeHelpeeColor = e => {
    helpeeRef.current.style.backgroundColor="green"
    helperRef.current.style.backgroundColor="transparent"
    helpUsRef.current.style.backgroundColor = "transparent"
    setCategories(e.target.value)
  }
  const changeHelperColor = e => {
    helperRef.current.style.backgroundColor = "green"
    helpeeRef.current.style.backgroundColor="transparent"
    helpUsRef.current.style.backgroundColor = "transparent"
    setCategories(e.target.value)
  }
  const changeHelpUsColor = e => {
    helpUsRef.current.style.backgroundColor = "green"
    helpeeRef.current.style.backgroundColor="transparent"
    helperRef.current.style.backgroundColor = "transparent"
    setCategories(e.target.value)
  }
  const change = e => {
    setImg1(e.target.files[0]);
    const pr = e.target.files[0];
    const reader1 = new FileReader();
    reader1.readAsDataURL(pr);
    reader1.onloadend = () => {
    setPrImg1(reader1.result)
    } 
  }
  const change2 = e => {
    setImg2(e.target.files[0]);
    const pr2= e.target.files[0];
    const reader2 = new FileReader();
    reader2.readAsDataURL(pr2);
    reader2.onloadend = () => {
    setPrImg2(reader2.result)} 
  }
  const change3 = e => {
    setImg3(e.target.files[0]);
    const pr3 =e.target.files[0]
    const reader3 = new FileReader();
    reader3.readAsDataURL(pr3);
    reader3.onloadend = () => {
      setPrImg3(reader3.result)} 
    }

  const clickHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", titleInput)
    formData.append("content", contentsInput)
    formData.append("category", categories)
    const value = date.toISOString()
    formData.append("appointed", value)
    formData.append("isDeadLine",parseInt(1))
    for (const property in input) {
      formData.append(`${property}`, input[property]);
    }
    
    if (img !== undefined) {
      formData.append("imageUrl1", img);
    }
    if (img2 !== undefined) {
      formData.append("imageUrl2", img2);
    } 
    if (img3 !== undefined) {
      formData.append("imageUrl3", img3);
    } 
    
    formData.append("tag", tags);
    dispatch(__updatePost({formData, id: userInfo.postId}));
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
  useEffect(() => {
    if (category === 1) { helpeeRef.current.style.backgroundColor = "green" }
    else if (category === 2) { helperRef.current.style.backgroundColor = "green" }
    else{ helpUsRef.current.style.backgroundColor = "green" }},[])

  return (
    <StWrapper>
      <StContainer>
        <StTitle>게시글 작성</StTitle>
        <label htmlFor="title">제목</label>
        <input
          value={titleInput}
          name="title"
          id="title"
          onChange={e=>setTitleInput(e.target.value)}
        ></input>
        <label htmlFor="content">내용입력</label>
        <StTextarea
          name="content"
          id="content"
          value={contentsInput}
          onChange={e=>setContentsInput(e.target.value)}
        ></StTextarea>
        <label htmlFor="date">날짜</label>
        <Calender value={date} setDate={setDate} />
        <label>카테고리 선택</label>
        <StInnerContainer>
          <Category value={1} ref={helpeeRef} onClick={changeHelpeeColor} >헬피</Category>
          <Category value={2} ref={helperRef} onClick={changeHelperColor}>헬퍼</Category>
          <Category value={3} ref={helpUsRef} onClick={changeHelpUsColor}>헬퍼스</Category>
          <div>(헬퍼스:단체 봉사 활동)</div>
        </StInnerContainer>
        <StGroupImgs>
          <input style={{ display: "none" }} accept="image/jpg, image/png, image/gif" id="image1" name="image1" type='file' onChange={change}/>
          <label htmlFor="image1"><StImg src={pr} alr="inputImage1" /></label>
          <input style={{ display: "none" }} accept="image/jpg, image/png, image/gif" id="image2" name="image2" type='file' onChange={change2}/>
          {pr2 == null ? <StImgButton htmlFor="image2">+</StImgButton> : (<label htmlFor="image2"><StImg src={pr2} alr="inputImage2" /></label>)}
          <input style={{ display: "none" }} accept="image/jpg, image/png, image/gif" id="image3" name="image3" type='file' onChange={change3}/>
          {pr3 == null ? <StImgButton htmlFor="image3">+</StImgButton> : (<label htmlFor="image3"><StImg src={pr3} alr="inputImage3" /></label>)}
        </StGroupImgs>
        <label>지역 설정</label>
        <div>
          <select name="location1" onChange={changeInputHandler}>
            <option value="">{userInfo.location1}</option>
            {state.map(el => (
              <option key={el.state} value={el.codeNm}>
                {el.codeNm}
              </option>
            ))}
          </select>
          <select name="location2" onChange={changeInputHandler}>
            <option value="">{userInfo.location2}</option>
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
          onKeyPress={e => handleKeyPress(e)}
          value={tag}
        />
        <StInnerContainer>
          <StButton mode="smpr" onClick={clickHandler}>
            수정
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
const Category = styled.button`
  width:100px;
  height:50px;
  background-color:transparent;
`

export default PostCreate;
