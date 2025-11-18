import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header";
import MoodieMain from "./page/MoodieMain";
import AddDiary from "./page/AddDiary";
import DiaryDetail from "./components/DiaryDetail";
import MoodieWeeklyRecord from "./page/MoodieWeeklyRecord";
import MoodieAllRecord from "./page/MoodieAllRecord";
import Login from "./page/Login";

function App() {
  return (
    <div className="min-h-screen w-full bg-[#f7ffed]">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MoodieMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddDiary />} />
          <Route path="/diary" element={<DiaryDetail />} />
          <Route path="/weeklyrecord" element={<MoodieWeeklyRecord />} />
          <Route path="/allrecord" element={<MoodieAllRecord />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
