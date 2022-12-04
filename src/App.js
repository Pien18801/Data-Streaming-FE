import './App.css';
import VideoInput from './component/VideoInput';
import WebcamRecord from './component/WebcamRecord';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<WebcamRecord/>} />
      <Route path="/upload" element={<VideoInput width={639} height={379} />} />
    </Routes>
  );
}
export default App;