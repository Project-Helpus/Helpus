import "./App.css";
import styled from "styled-components";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import Router from "./shared/Router";
import logo from "./asset/logo_32x32.svg";

if (process.env.REACT_APP_NODE_ENV === "production") {
  disableReactDevTools();
}

function App() {
  return (
    <div className="App">
      <Router />
      <StGuideBtn
        onClick={() =>
          window.open(
            "https://soroya.notion.site/Helpus-Guide-898d809d9bc64782a12a92de71064df8",
            "_blank"
          )
        }
      >
        <img src={logo} alt="helpus_guide_button"></img>
        &nbsp;&nbsp;Guide
      </StGuideBtn>
    </div>
  );
}

export default App;

const StGuideBtn = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 6%;
  right: 2%;
  padding: 14px 20px;
  font-weight: 800;
  font-size: 20px;
  border: none;
  box-shadow: rgb(255 255 255 / 12%) 0px 0px 2px 0px inset,
    rgb(0 0 0 / 5%) 0px 0px 2px 1px, rgb(0 0 0 / 22%) 0px 4px 20px;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.9),
    rgb(255, 255, 255)
  );
  backdrop-filter: blur(30px);
  border-radius: 22px;
`;
