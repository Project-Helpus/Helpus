import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StWrapper, StButton } from "../../components/UI/StIndex";
import { __createPost } from "../../redux/modules/postSlice";
import { 행정구역 } from "./element/address";
import { categoryType } from "./element/categoryType";
import Calender from "./element/Calender";
import arrow_forward_pink from "../../asset/arrow_forward_pink.svg";
import add_circle_outline from "../../asset/add_circle_outline.svg";
import crsLeftButton from "../../asset/CrsLeft.svg";
import crsRightButton from "../../asset/CrsRight.svg";

const PostCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state, city } = 행정구역;
  const [getImg, setGetImg] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [img, setImg] = useState([]);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [btnActive, setBtnActive] = useState("");
  const [date, setDate] = useState();
  const [input, setInput] = useState({
    title: "",
    content: "",
    category: 0,
    location1: "",
    location2: "",
  });
  const crsRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const TotalSlides = previewImg?.length - 4;
  const moveCrsLeft = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TotalSlides);
      // 마지막 사진으로 이동
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const moveCrsRight = () => {
    if (currentSlide >= TotalSlides) {
      //더 이상 넘어갈 슬라이드가 없으면 //1번째 사진으로 넘어간다
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    if (name === "category") {
      setBtnActive(value);
    }
  };

  const changeImgHandler = (e) => {
    const file = e.target.files;
    const fileUrl = [];

    if (file.length > 10) {
      alert("최대 10개 까지 첨부 가능합니다");
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

  const clickHandler = (e) => {
    e.preventDefault();
    if (window.confirm("게시 하시겠습니까?")) {
      const formData = new FormData();
      const day = date.toISOString();

      formData.append("appointed", day);
      formData.append("tag", tags);

      for (const property in input) {
        formData.append(`${property}`, input[property]);
      }
      for (let i = 0; i < img.length; i++) {
        formData.append("post-images", img[i]);
      }
      dispatch(__createPost(formData));
      navigate("/postlist");
    }
  };

  const removeTag = (i) => {
    const clonetags = tags.slice();
    clonetags.splice(i, 1);
    setTags(clonetags);
  };

  const addTag = (e) => {
    if (tags.length > 2) {
      window.alert("태그는 최대 3개까지 가능합니다.");
      return;
    }
    if (e.target.value.length > 7) {
      window.alert("최대 8글자 까지 가능합니다.");
      return;
    }
    setTag(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tag !== "" && tag.length < 8) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  useEffect(() => {
    crsRef.current.style.transition = "all 0.5s ease-in-out";
    crsRef.current.style.transform = `translateX(-${currentSlide * 205}px)`;
  }, [currentSlide]);

  return (
    <StWrapper>
      <StContainer>
        <StBox>
          <StBackBtn onClick={() => navigate(-1)}>
            <img src={arrow_forward_pink} alt="back_button" />
          </StBackBtn>
          <StTitle>게시글 작성</StTitle>
        </StBox>
        <StCol>
          <StLabel htmlFor="title">제목</StLabel>
          <input
            name="title"
            id="title"
            placeholder="제목 입력하시오"
            onChange={changeInputHandler}
          ></input>
        </StCol>
        <StCol>
          <StLabel htmlFor="content">내용입력</StLabel>
          <StTextarea
            name="content"
            id="content"
            placeholder="내용을 입력하시오."
            onChange={changeInputHandler}
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
            {categoryType.map((el, idx) => {
              if (Number(btnActive) === idx + 1) {
                return (
                  <StSelectedCategory
                    name="category"
                    id="category"
                    key={idx}
                    value={idx + 1}
                    onClick={changeInputHandler}
                    readOnly
                  >
                    {el}
                  </StSelectedCategory>
                );
              } else {
                return (
                  <StCategory
                    name="category"
                    id="category"
                    key={idx}
                    value={idx + 1}
                    onClick={changeInputHandler}
                    readOnly
                  >
                    {el}
                  </StCategory>
                );
              }
            })}
            <span>(헬퍼스:단체 활동)</span>
          </StInnerBox>
        </StCol>
        <StCol>
          {getImg ? (
            <StLabel htmlFor="image">
              사진 첨부(첫번째 이미지는 썸네일로 사용됩니다. 이미지가 없다면
              임의 사진으로 대체 됩니다.)
            </StLabel>
          ) : (
            <StLabel htmlFor="image">
              사진 첨부(최소 1장의 이미지를 반드시 첨부 해 주세요)
            </StLabel>
          )}
          {/* <Carousel /> */}
          <input
            ref={crsRef}
            style={{ display: "none" }}
            accept="image/jpg, image/png, image/gif"
            id="image"
            name="image"
            type="file"
            onChange={changeImgHandler}
            multiple
          />
          <StRow>
            {previewImg ? (
              <StCrsContainser value={currentSlide + 1}>
                <StCrsLeftButton
                  src={crsLeftButton}
                  onClick={moveCrsLeft}
                ></StCrsLeftButton>
                <StCrsRightButton
                  src={crsRightButton}
                  onClick={moveCrsRight}
                ></StCrsRightButton>
                <StHidden>
                  <StFlexBox ref={crsRef}>
                    {previewImg?.map((el, i) => (
                      <label htmlFor="image" key={i}>
                        <StCrsImg src={el} alt="inputImage" />
                      </label>
                    ))}
                  </StFlexBox>
                </StHidden>
              </StCrsContainser>
            ) : (
              <>
                <StImgButton htmlFor="image">
                  <img src={add_circle_outline} alt="image_add" />
                </StImgButton>
                <StImgButton htmlFor="image">
                  <img src={add_circle_outline} alt="image_add" />
                </StImgButton>
                <StImgButton htmlFor="image">
                  <img src={add_circle_outline} alt="image_add" />
                </StImgButton>
              </>
            )}
          </StRow>
        </StCol>
        <StCol>
          <StLabel>지역 설정</StLabel>
          <StBox>
            <StSelector name="location1" onChange={changeInputHandler}>
              <option value="">선택</option>
              {state.map((el) => (
                <option key={el.state} value={el.codeNm}>
                  {el.codeNm}
                </option>
              ))}
            </StSelector>
            <StSelector name="location2" onChange={changeInputHandler}>
              <option value="">선택</option>
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
        <StCol>
          <StLabel htmlFor="tag">태그 (최대 3개)</StLabel>
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
            onKeyDown={(e) => handleKeyPress(e)}
            value={tag}
          />
        </StCol>
        <StRow>
          <StButton mode="pinkMdBtn" onClick={clickHandler}>
            게시
          </StButton>
        </StRow>
      </StContainer>
    </StWrapper>
  );
};

export default PostCreate;

const StCrsImg = styled.img`
  width: 185px;
  height: 225px;
  margin-right: 20px;
  cursor: pointer;
`;
const StCrsContainser = styled.div`
  width: 800px;
  position: relative;
`;
const StCrsLeftButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 40%;
  transform: translateX(-3em);
`;
const StCrsRightButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 40%;
  right: 0;
  transform: translateX(3em);
`;
const StHidden = styled.div`
  overflow: hidden;
  display: flex;
`;
const StTitle = styled.h2`
  text-align: center;
  width: 100%;
`;

const StBackBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
`;

const StContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 55px;
  width: 800px;
`;

const StInnerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StBox = styled.article`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StLabel = styled.label`
  font-size: 20px;
  font-weight: 800;
`;

const StTextarea = styled.textarea`
  resize: none;
  height: 300px;
`;

const StTagContainer = styled.div`
  display: flex;
  width: 590px;
  flex-flow: row;
`;

const StRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
`;

const StImgButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 225px;
  background-color: white;
  border: 0.5px dashed black;
  border-radius: 10px;
  cursor: pointer;
`;

const StTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 0 4px;
  border-radius: 12px;
  margin-right: 10px;
  background-color: pink;
  color: white;
  font-size: 18px;
  font-weight: 800;
`;

const StTagName = styled.span`
  margin-right: 10px;
`;

const StTagButton = styled.button`
  width: 20px;
  border: 0.5px solid white;
  border-radius: 50%;
  color: white;
  background-color: transparent;
  cursor: pointer;
`;

const StCategory = styled.button`
  width: 160px;
  height: 44px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-weight: 800;
`;

const StSelectedCategory = styled.button`
  width: 160px;
  height: 44px;
  background-color: ${(props) => props.theme.colors.subPink};
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-weight: 800;
`;

const StSelector = styled.select`
  width: 300px;
  height: 44px;
  border-radius: 10px;
`;

const StFlexBox = styled.div`
  display: flex;
`;
