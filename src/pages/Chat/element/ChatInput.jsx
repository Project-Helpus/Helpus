import * as StChat from "../styles/StChat";
import add_a_photo from "../../../asset/add_a_photo.svg";

const ChatInputBox = ({
  msg,
  changeInputHandler,
  sendMsg,
  sendImage,
  fileInput,
}) => {
  return (
    <StChat.StInputBox>
      <StChat.StInput
        value={msg}
        onKeyPress={(e) => sendMsg(e)}
        onChange={changeInputHandler}
        placeholder="메세지 입력"
      ></StChat.StInput>
      <input
        style={{ display: "none" }}
        accept=".jpg, .jpeg, .png"
        id="image"
        name="image"
        type="file"
        ref={fileInput}
        onChange={sendImage}
      />
      <img
        onClick={() => {
          fileInput.current.click();
        }}
        src={add_a_photo}
        alt="image_upload"
      />
    </StChat.StInputBox>
  );
};

export default ChatInputBox;
