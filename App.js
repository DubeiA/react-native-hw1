import { Provider } from "react-redux";
import { store } from "./redux/auth/store";
import { MainMenu } from "./components/MainMenu";

export default function App() {
  return (
    <Provider store={store}>
      <MainMenu />
    </Provider>
  );
}
