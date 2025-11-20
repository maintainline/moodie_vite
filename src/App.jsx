import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header";
import MoodieMain from "./page/MoodieMain";
import AddDiary from "./page/AddDiary";
import DiaryDetail from "./page/DiaryDetail";
import MoodieWeeklyRecord from "./page/MoodieWeeklyRecord";
import MoodieAllRecord from "./page/MoodieAllRecord";
import Login from "./page/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen w-full bg-[#f7ffed]">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MoodieMain />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddDiary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diary/:id"
            element={
              <ProtectedRoute>
                <DiaryDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weeklyrecord"
            element={
              <ProtectedRoute>
                <MoodieWeeklyRecord />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allrecord"
            element={
              <ProtectedRoute>
                <MoodieAllRecord />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
