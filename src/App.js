import "./App.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import Router from "./shared/Router";
import ScrollToTop from "./components/ScrollTop";

if (process.env.REACT_APP_NODE_ENV === "production") {
  disableReactDevTools();
}

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
      </Router>
    </div>
  );
}

export default App;
