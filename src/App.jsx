import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header";
import MoodieMain from "./page/MoodieMain";
import AddDiary from "./page/AddDiary";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MoodieMain />} />
        <Route path="/add" element={<AddDiary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
