import styled from "styled-components";
export const StTitleButtonWrapper = styled.div`
  max-width: 1280px;
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const StLocation = styled.p`
  font-size: 28px;
  color: #ea9db4;
`;

export const StWriteButton = styled.button`
  width: 150px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  background-color: #ea9db4;
  border-radius: 20px;
  border: none;
`;

export const StTabWrapper = styled.div`
  display: flex;
  flex-direction: flex-start;
  height: 50px;
  width: 100%;
  max-width: 1280px;
  margin: 3em 0 3em 0;
  font-size: 20px;
  div {
    padding-bottom: 10px;
    margin-right: 3px;
    line-height: 50px;
    border-bottom: 4px solid #b4b4b4;
    &:nth-child(5) {
      border-bottom: 1px solid #ffc3d5;
    }
  }
`;
export const StTap = styled.div`
  width: 100px;
  color: #b4b4b4;
  text-align: center;
`;

export const StToggleWrapper = styled.div`
  display: inline-block;
  width: 200px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid #ffc3d5;
  position: relative;
`;
export const StLabelAll = styled.label`
  width: 50%;
  height: 100%;
  color: #fff;
  line-height: 50px;
  text-align: center;
  display: inline-block;
`;

export const StToggle = styled.input`
  width: 50%;
  height: 100%;
  left: 0;
  border-radius: 50px;
  background-color: #ea9db4;
  position: absolute;
  z-index: -1;
  transition: 0.3s;
`;

export const StLabelMy = styled.label`
  width: 50%;
  height: 100%;
  color: #b4b4b4;
  line-height: 50px;
  text-align: center;
  display: inline-block;
`;
export const StCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1280px;
  width: 100%;
  gap: 2.25% 3.125%;
`;
export const StSearch = styled.form`
  position: relative;
  input {
    width: 400px;
    height: 44px;
    border: 1px solid ${(props) => props.theme.colors.lightGray};
    padding-left: 20px;
    border-radius: 100px;
    font-size: 12px;
    border: 1px solid ${(props) => props.theme.colors.lightGray};
  }
  input::placeholder {
    color: ${(props) => props.theme.colors.lightGray};
  }
  input:focus {
    outline: ${(props) => props.theme.colors.mainPink};
  }
  img {
    position: absolute;
    right: 0.8em;
    top: 40%;
    transform: translate(-50%, -50%);
  }
`;
export const StObserverDiv = styled.div`
  width: 100%;
  height: 20%;
  margin-top: 10%;
  font-size: 40px;
`;
