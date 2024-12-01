import axios from "axios";
import React, { useEffect, useState } from "react";

interface RankingList {
  ranker: number;
  userName: string;
  level: number;
}

const RankingPage: React.FC = () => {
  const [ranking, setRanking] = useState<Array<RankingList>>([
    { ranker: 1, userName: "김청해", level: 15 },
  ]);

  const getRanking = async () => {
    try {
      const response = await axios.get(
        "http://113.198.230.24:3338/ranking/top"
      );
      const data: Array<RankingList> = await response.data;

      setRanking(data);
    } catch (error) {
      console.error("Ranking Top API Error : " + error);
    }
  };

  useEffect(() => {
    getRanking();
  }, []);

  return (
    <div className="min-h-screen w-full bg-orange-50/40">
      {/* Page Header */}
      <div className="text-center mb-6 py-3">
        <h1 className="text-2xl font-bold text-orange-500 mb-3">랭킹</h1>
        <p className="text-gray-400">이번 주 상위 러너 랭킹</p>
      </div>

      {/* Scrollable Ranking List */}
      <div className="w-full h-[600px] overflow-y-auto space-y-4 bg-orange-50/40 p-4 rounded-lg shadow-md border mt-2">
        {ranking.length !== 0 &&
          ranking.map((person, index) => (
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
                  <p className="text-lg font-bold">{person.userName}</p>
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
