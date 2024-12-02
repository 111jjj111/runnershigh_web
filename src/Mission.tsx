import React from "react";

interface Mission {
  id: number;
  title: string;
  completed: boolean;
  tag: string; // Newbie, Crew, or Sole
}

interface RankingList {
  name: string;
  level: number;
}

const Missions: React.FC = () => {
  const ranking: RankingList = { name: "뉴비 러너", level: 1 };

  const missions: Mission[] = [
    { id: 1, title: "로그인 하기", completed: true, tag: "Newbie" },
    {
      id: 2,
      title: "커뮤니티 페이지 확인하기",
      completed: true,
      tag: "Newbie",
    },
    {
      id: 3,
      title: "나만의 러너소개 작성하기",
      completed: false,
      tag: "Newbie",
    },
    { id: 4, title: "1Km 달성하기", completed: false, tag: "Sole" },
    { id: 5, title: "3Km 달성하기", completed: false, tag: "Sole" },
    {
      id: 6,
      title: "크루 게시판에 글 게시하기",
      completed: false,
      tag: "Crew",
    },
    { id: 7, title: "이번주 러닝코스 정하기", completed: false, tag: "Crew" },
  ];

  return (
    <div className="h-screen flex flex-col bg-orange-50/40 mt-5">
      {/* Header */}
      <div className="flex flex-col items-center mb-6 py-3">
        <h1 className="text-2xl font-bold text-red-500">오늘의 미션</h1>
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-gray-600 font-medium">LV.{ranking.level}</span>
          <span className="text-gray-800 font-bold">{ranking.name}</span>
        </div>
      </div>

      {/* Mission List */}
      <div className="space-y-4 lg:max-w-lg mx-3 ">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`relative flex justify-between items-center p-4 border-2 rounded-lg shadow-md ${
              mission.completed
                ? "bg-orange-100 border-orange-400"
                : "bg-white border-gray-300"
            }`}
          >
            {/* 왼쪽: 미션 제목 */}
            <div className="flex items-center">
              {mission.completed ? (
                <div className="text-red-500 text-2xl mr-4">✔️</div>
              ) : (
                <div className="w-6 h-6 border rounded-full border-gray-300 mr-4"></div>
              )}
              <p
                className={`text-lg font-medium ${
                  mission.completed
                    ? "line-through text-gray-600 decoration-[3px]"
                    : "text-gray-800"
                }`}
              >
                {mission.title}
              </p>
            </div>

            {/* 오른쪽: 태그 */}
            <div
              className={`absolute -left-3 -top-2 px-2 py-0.5 text-xs font-bold rounded-full ${
                mission.tag === "Newbie"
                  ? "bg-orange-400 text-white"
                  : mission.tag === "Crew"
                  ? "bg-red-500 text-white"
                  : mission.tag === "Sole"
                  ? "bg-blue-400 text-white" // Sole 태그 색상
                  : "bg-gray-300 text-black" // 기본값
              }`}
            >
              {mission.tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;
