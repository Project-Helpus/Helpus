import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { address } from "../../asset/address";
import { categoryType } from "./element/categoryType";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StWrapper, StButton } from "../../components/UI/StIndex";
import { __createPost } from "../../redux/modules/postSlice";
import Calender from "./element/Calender";
import arrow_forward_pink from "../../asset/arrow_forward_pink.svg";
import add_circle_outline from "../../asset/add_circle_outline.svg";
import crsLeftButton from "../../asset/CrsLeft.svg";
import crsRightButton from "../../asset/CrsRight.svg";

const PostCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state, city } = address;
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
    category: "",
  });
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");
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
      //더 이상 넘어갈 슬라이드가 없으면 1번째 사진으로 넘어감
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

    // image reader
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

  const clickHandler = async (e) => {
    e.preventDefault();
    let day;
    if (window.confirm("게시 하시겠습니까?")) {
      const formData = new FormData();
      if (date) {
        day = date.toISOString();
        formData.append("appointed", day);
      }

      if (tags.length !== 0) {
        formData.append("tag", tags);
      }

      if (location1) {
        formData.append("location1", location1);
      }

      if (location2) {
        formData.append("location2", location2);
      }

      for (const property in input) {
        formData.append(`${property}`, input[property]);
      }
      for (let i = 0; i < img.length; i++) {
        formData.append("post-images", img[i]);
      }
      const res = await dispatch(__createPost(formData));
      console.log(res);
      if (res.meta.requestStatus === "fulfilled") {
        window.alert("게시물이 생성 되었습니다.");
        navigate(`/post/${res.payload.postId}`);
      } else if (res.meta.requestStatus === "rejected") {
        window.alert("제목, 내용, 카테고리 선택은 필수 입니다.");
      }
    }
  };
  const blindText = useRef(null);
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
  const changeOver = (el) => {
    if (el === 1) {
      blindText.current.innerHTML =
        "헬피는 재능기부를 요청하거나 도움을 받아볼 수 있어요.";
      blindText.current.style.color = "red";
    } else if (el === 2) {
      blindText.current.innerHTML =
        "헬퍼는 재능을 기부하거나 도움을 줄수 있어요.";
      blindText.current.style.color = "red";
    } else {
      blindText.current.innerHTML =
        "헬퍼스로 단체 재능기부나 봉사활동을 모집해 보세요.";
      blindText.current.style.color = "red";
    }
  };
  const changeOut = (el) => {
    if (el === 1) {
      blindText.current.style.color = "#fff";
    } else if (el === 2) {
      blindText.current.style.color = "#fff";
    } else {
      blindText.current.style.color = "#fff";
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
          <StLabel htmlFor="title">
            제목 * <StLengthCount>({input.title.length}/45)</StLengthCount>
          </StLabel>
          <input
            name="title"
            id="title"
            placeholder="제목 입력해주세요"
            maxLength={45}
            onChange={changeInputHandler}
          ></input>
        </StCol>
        <StCol>
          <StLabel htmlFor="content">
            내용입력 *{" "}
            <StLengthCount>({input.content.length}/500)</StLengthCount>
          </StLabel>
          <StTextarea
            name="content"
            id="content"
            placeholder="내용을 입력해주세요"
            maxLength={500}
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
            <StLabel>카테고리 *</StLabel>
            {categoryType.map((el, idx) => {
              if (Number(btnActive) === idx + 1) {
                return (
                  <>
                    <StSelectedCategory
                      name="category"
                      id="category"
                      key={idx}
                      value={idx + 1}
                      onClick={changeInputHandler}
                      readOnly
                      onMouseOut={() => changeOut(idx + 1)}
                    >
                      {el}
                    </StSelectedCategory>
                  </>
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
                    onMouseOver={() => changeOver(idx + 1)}
                    onMouseOut={() => changeOut(idx + 1)}
                  >
                    {el}
                  </StCategory>
                );
              }
            })}
          </StInnerBox>
          <StBlindP ref={blindText}>봉사활동</StBlindP>
        </StCol>
        <StCol>
          <StLabel htmlFor="image">사진</StLabel>
          {getImg && (
            <span htmlFor="image">
              첫번째 이미지는 썸네일로 보여집니다. 이미지가 없다면 임의 사진으로
              대체 됩니다.
            </span>
          )}
          <input
            ref={crsRef}
            style={{ display: "none" }}
            accept=".jpg, .jpeg, .png"
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
          <StLabel htmlFor="tag">
            태그 <StLengthCount>({tags.length}/3)</StLengthCount>
          </StLabel>
          <StTagContainer>
            {tags.map((e, i) => (
              <StTag key={i} onClick={() => removeTag(i)}>
                <span>{e}</span>
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
  gap: 35px;
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

const StBlindP = styled.p`
  padding: 4px 0;
  color: #fff;
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

const StLengthCount = styled.span`
  color: ${(props) => props.theme.colors.lightGray};
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

const StTag = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  border-radius: 12px;
  margin-right: 10px;
  background-color: pink;
  color: white;
  font-size: 18px;
  font-weight: 800;
  border: none;
`;

const StCategory = styled.button`
  position: relative;
  width: 160px;
  height: 44px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-weight: 800;
`;

const StSelectedCategory = styled.button`
  position: relative;
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
