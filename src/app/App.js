import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import { store } from "../redux/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
