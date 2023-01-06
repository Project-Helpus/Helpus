import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { address } from "./element/Address";
import { __kakaoState } from "../../redux/modules/userSlice";

const State = () => {
  const dispatch = useDispatch();
  //input state 초기값
  const [input, setInput] = useState({
    state1: "",
    state2: "",
  });

  //주소 불러오기
  const { state, city } = address;

  //submit 이벤트 핸들러
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(__kakaoState(input));
  };
  //input 이벤트 핸들러
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>지역 설정</label>
        <select name="state1" onChange={onChangeHandler}>
          <option>:: 선택 ::</option>
          {state.map((el) => (
            <option key={el.state} value={el.state}>
              {el.codeNm}
            </option>
          ))}
        </select>
        <select name="state2" onChange={onChangeHandler}>
          <option>:: 선택 ::</option>
          {city
            .filter((el) => el.state === input.state1)
            .map((el) => (
              <option key={el.city} value={el.codeNm}>
                {el.codeNm}
              </option>
            ))}
        </select>
        <button>저장</button>
      </form>
    </div>
  );
};

export default State;
