import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import chessAnimation from "../components/chess.json"; // adjust path if needed

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-6 py-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-6 slide-text">🎓 Welcome to MateMaster!</h1>
        <p className="text-xl mb-10">Your smart multiplayer chess platform.</p>
      </div>

      {/* Animation */}
      <div className="w-full max-w-2xl mb-12 mx-auto">
        <Lottie 
          animationData={chessAnimation} 
          loop={true} 
          style={{ width: 350, height: 350, margin: "0 auto" }} 
        />
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 w-full max-w-4xl mb-10">
        <button
          onClick={() => navigate("/tutorials")}
          className="bg-white text-indigo-700 font-extrabold text-4xl py-8 px-20 rounded-3xl shadow-2xl hover:scale-110 transition transform"
        >
          📚 Manage Tutorials
        </button>
        <button
          onClick={() => navigate("/games")}
          className="bg-white text-indigo-700 font-extrabold text-4xl py-8 px-20 rounded-3xl shadow-2xl hover:scale-110 transition transform"
        >
          🎮 Manage Games
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          className="bg-white text-indigo-700 font-extrabold text-4xl py-8 px-20 rounded-3xl shadow-2xl hover:scale-110 transition transform"
        >
          🏆 Leaderboard
        </button>
        <button
          onClick={() => navigate("/users")}
          className="bg-white text-indigo-700 font-extrabold text-4xl py-8 px-20 rounded-3xl shadow-2xl hover:scale-110 transition transform"
        >
          👤 Users
        </button>
      </div>
    </div>
  );
};

export default Home;
