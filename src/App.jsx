import "./App.css";
import CustomRoutes from "./app/routes";
import { AudioProvider } from "./app/audioContext";

function App() {
  return (
    <AudioProvider>
      <CustomRoutes />
    </AudioProvider>
  );
}

export default App;
