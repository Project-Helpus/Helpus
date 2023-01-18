import "./App.css";
import React, { useEffect } from "react";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import Router from "./shared/Router";
import { __checkLogin } from "./redux/modules/userSlice";
import { useDispatch } from "react-redux";

if (process.env.REACT_APP_NODE_ENV === "production") {
  disableReactDevTools();
}

function App() {
  const disPatch = useDispatch();
  useEffect(() => {
    disPatch(__checkLogin());
  });
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
