import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header";
import MoodieMain from "./page/MoodieMain";
import AddDiary from "./page/AddDiary";
import TodayDiaryDetail from "./components/TodayDiaryDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MoodieMain />} />
        <Route path="/add" element={<AddDiary />} />
        <Route path="/detail" element={<TodayDiaryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
