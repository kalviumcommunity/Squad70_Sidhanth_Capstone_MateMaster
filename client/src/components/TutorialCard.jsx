import React from 'react';

const TutorialCard = ({ title, description, level }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-700 mb-2">{description}</p>
      <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded">
        Level: {level}
      </span>
    </div>
  );
};

export default TutorialCard;