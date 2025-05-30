import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home"; // ✅ import your new homepage
import TutorialManager from "./components/TutorialManager";
import GameManager from "./components/GameManager";
import LeaderboardManager from "./components/LeaderboardManager";
import UserManager from "./components/UserManager";
import Spinner from "./components/spinner";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tutorials" element={<TutorialManager />} />
        <Route path="/" element={<Home />} /> {/* ✅ homepage route */}
        <Route path="/leaderboard" element={<LeaderboardManager />} />
        <Route path="/users" element={<UserManager />} />
        <Route path="/games" element={<GameManager />} />
        <Route path="/spinner" element={<Spinner/>}/>
      </Routes>
    </Router>
  );
};

export default App;
