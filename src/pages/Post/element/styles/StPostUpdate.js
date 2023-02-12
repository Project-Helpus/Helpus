import styled from "styled-components";

export const StContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 55px;
  width: 800px;
`;

export const StBox = styled.article`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StBackBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
`;

export const StTitle = styled.h2`
  text-align: center;
  width: 100%;
`;

export const StCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StLabel = styled.label`
  font-size: 20px;
  font-weight: 800;
`;

export const StTextarea = styled.textarea`
  resize: none;
  height: 300px;
`;

export const StInnerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StCategory = styled.button`
  width: 160px;
  height: 44px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-weight: 800;
`;

export const StSelector = styled.select`
  width: 300px;
  height: 44px;
  border-radius: 10px;
`;

export const StRedFont = styled.p`
  color: red;
`;

export const StTagContainer = styled.div`
  display: flex;
  width: 590px;
  flex-flow: row;
`;

export const StTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-right: 10px;
  background-color: pink;
  color: white;
  font-size: 16px;
  font-weight: 800;
`;

export const StTagName = styled.span`
  margin-right: 10px;
`;

export const StTagButton = styled.button`
  width: 20px;
  border: 0.5px solid white;
  border-radius: 50%;
  color: white;
  background-color: transparent;
  cursor: pointer;
`;

export const StRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
`;
