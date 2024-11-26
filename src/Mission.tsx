import React from "react";

interface Mission {
  id: number;
  title: string;
  completed: boolean;
}

interface RankingList {
  name: string;
  level: number;
}

const Missions: React.FC = () => {
  const ranking: RankingList = { name: "뉴비 러너", level: 1 };

  const missions: Mission[] = [
    { id: 1, title: "1km 달성하기", completed: true },
    { id: 2, title: "3km 달성하기", completed: false },
    { id: 3, title: "5km 달성하기", completed: false },
    { id: 4, title: "3일 연속 달리기", completed: false },
    { id: 5, title: "7일 연속 달리기", completed: false },
    { id: 5, title: "게시판 글 게시하기", completed: false },
  ];

  return (
    <div className="p-6 bg-white h-screen">
      {/* Mission Header */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-bold text-red-500">오늘의 미션</h1>
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-gray-600 font-medium">LV.{ranking.level}</span>
          <span className="text-gray-800 font-bold">{ranking.name}</span>
        </div>
      </div>

      {/* Mission List */}
      <div className="space-y-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`flex justify-between items-center p-4 border rounded-lg shadow-md ${
              mission.completed ? "bg-red-100" : "bg-white"
            }`}
          >
            <p
              className={`text-lg font-medium ${
                mission.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {mission.title}
            </p>
            <input
              type="checkbox"
              checked={mission.completed}
              readOnly
              className="h-5 w-5 text-red-500 focus:ring-red-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;
6;
