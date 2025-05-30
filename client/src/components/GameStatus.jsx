import React from 'react';

const GameStats = ({ wins, losses, draws }) => {
  const totalGames = wins + losses + draws;
  const winRate = totalGames === 0 ? 0 : ((wins / totalGames) * 100).toFixed(1);

  return (
    <div className="game-stats p-4 bg-gray-100 rounded shadow">
      <h3 className="text-xl font-semibold mb-3">Game Statistics</h3>
      <ul>
        <li>Wins: <strong>{wins}</strong></li>
        <li>Losses: <strong>{losses}</strong></li>
        <li>Draws: <strong>{draws}</strong></li>
        <li>Total Games: <strong>{totalGames}</strong></li>
        <li>Win Rate: <strong>{winRate}%</strong></li>
      </ul>
    </div>
  );
};

export default GameStats;