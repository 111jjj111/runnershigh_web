import React from "react";

interface RankingList {
  name: string;
  level: number;
}

const RankingPage: React.FC = () => {
  const ranking: RankingList[] = [
    { name: "김청해", level: 15 },
    { name: "김영진", level: 14 },
    { name: "민병주", level: 13 },
    { name: "류승현", level: 12 },
    { name: "장현오", level: 11 },
    { name: "임도훈", level: 10 },
    { name: "오유진", level: 9 },
    { name: "김도영", level: 8 },
    { name: "이승현", level: 7 },
    { name: "박지훈", level: 6 },
    { name: "윤소희", level: 5 },
    { name: "최정민", level: 4 },
    { name: "송예은", level: 3 },
    { name: "배수현", level: 2 },
    { name: "신지우", level: 1 },
  ];

  return (
    <div className="py-6 min-h-screen w-full">
      {/* Page Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-red-500 mb-3">랭킹</h1>
        <p className="text-gray-600">이번 주 상위 러너 랭킹</p>
      </div>

      {/* Scrollable Ranking List */}
      <div className="w-full h-[600px] overflow-y-auto space-y-4 bg-white p-4 rounded-lg shadow-md border mt-2">
        {ranking.map((person, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 border rounded-lg ${
              index === 0
                ? "bg-yellow-100 border-yellow-400"
                : index === 1
                ? "bg-gray-200 border-gray-400"
                : index === 2
                ? "bg-[#dcbe9e] border-[#6a4c24]"
                : "bg-white"
            }`}
          >
            {/* Rank */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center font-bold rounded-full text-white ${
                  index === 0
                    ? "bg-yellow-400"
                    : index === 1
                    ? "bg-gray-400"
                    : index === 2
                    ? "bg-[#ad8a56]"
                    : "bg-[#FF9E77]"
                }`}
              >
                {index + 1}
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
