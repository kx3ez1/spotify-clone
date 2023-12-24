import "./App.css";
import CustomRoutes from "./app/routes";
import { AudioProvider } from "./app/audioContext";
import FixedBottomPlayer from "./components/child/playerComponent";

function App() {
  return (
    <AudioProvider>
      <FixedBottomPlayer />
      <CustomRoutes />
    </AudioProvider>
  );
}

export default App;
