import Flow from "./components/flow";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import Login from "./components/login";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Flow />
        <Login />
      </Provider>
    </div>
  );
}

export default App;
