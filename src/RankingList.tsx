import React from "react";

interface RankingList {
  name: string;
  level: string;
  position: number;
}

const RankingPage: React.FC = () => {
  const ranking: RankingList[] = [
    { name: "김영진", level: "13", position: 3 },
    { name: "민병주", level: "14", position: 2 },
    { name: "김청해", level: "15", position: 1 },
    { name: "류승현", level: "12", position: 4 },
    { name: "장현오", level: "11", position: 6 },
    { name: "임도훈", level: "10", position: 7 },
    { name: "김도영", level: "09", position: 9 },
    { name: "오유진", level: "08", position: 10 },
    { name: "박지훈", level: "07", position: 11 },
  ];

  return (
    <div className="min-h-screen w-full bg-orange-50/40">
      {/* Page Header */}
      <div className="text-center mb-6 py-3">
        <h1 className="text-2xl font-bold text-orange-500 mb-3">랭킹</h1>
        <h1 className="text-2xl font-bold text-gray-500 mb-3">
          이번 주 상위 러너 랭킹
        </h1>
      </div>

      {/* Leaderboard Section */}
      <div className="flex justify-center items-end space-x-4 h-[300px] mb-6 bg-white rounded-lg">
        {ranking.slice(0, 3).map((person) => (
          <div
            key={person.position}
            style={{
              height:
                person.position === 3
                  ? "150px"
                  : person.position === 2
                  ? "200px"
                  : "250px",
            }}
            className={`w-[80px] rounded-lg flex flex-col justify-between items-center ${
              person.position === 3
                ? "bg-yellow-700"
                : person.position === 2
                ? "bg-gray-300"
                : "bg-yellow-300"
            }`}
          >
            {/* 그래프 텍스트 */}
            <div className="p-4 text-center text-black flex flex-col items-center">
              {/* 이모지 */}
              <div className="text-3xl mb-1">
                {person.position === 1 && "👑"}
              </div>
              {/* 이름 및 기타 정보 */}
              <p className="text-3 font-bold">{person.name}</p>
              <p className="text-sm">LV. {person.level}</p>
            </div>
            {/* 순위 */}
            <div className="text-center text-2xl font-bold mb-3">
              {person.position}
            </div>
          </div>
        ))}
      </div>

      {/* Scrollable Ranking List */}
      <div className="w-full h-[600px] overflow-y-auto space-y-4 bg-orange-50/40 p-4 rounded-lg shadow-md border mt-2">
        {ranking.slice(3).map((person, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg bg-white"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center font-bold rounded-full text-white bg-[#FF9E77]">
                {person.position}
              </div>
              <div className="ml-4">
                <p className="text-lg font-bold">{person.name}</p>
                <p className="text-sm text-gray-500">LV.{person.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingPage;
