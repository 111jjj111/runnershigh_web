import { useEffect, useState } from "react";
import React from "react";
import { posts } from "./contents/postItem";
import { useNavigate } from "react-router-dom";

// 날짜 타입 정의
interface DateItem {
  day: number;
  label: string;
  active: boolean;
}

const BoardList: React.FC = ({}) => {
  const navigate = useNavigate();
  // 날짜 데이터
  const [date, setDate] = useState<DateItem[]>([
    { day: 12, label: "화", active: true },
    { day: 13, label: "수", active: false },
    { day: 14, label: "목", active: false },
  ]);

  return (
    <div className="bg-white h-screen flex flex-col">
      {/* 헤더 */}
      <header className="bg-[#FF9E77] p-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-white mb-2">게시판</h1>
          <p className="text-sm text-white text-center">
            현재위치: 부산광역시 부산진구 엄광로 176
          </p>
        </div>
      </header>

      {/* 날짜 선택 */}
      <div className="p-4 item">
        <div className="flex gap-2 justify-center">
          {date.map((value, index) => (
            <button
              key={index}
              onClick={() => {
                setDate(
                  date.map((item) =>
                    item.day === value.day
                      ? { ...item, active: true }
                      : { ...item, active: false }
                  )
                );
              }}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg border
        ${
          value.active
            ? "bg-orange-500 text-white"
            : "border-orange-500 text-orange-500"
        }`}
            >
              <span className="text-lg font-bold">{value.day}</span>
              <span className="text-sm">{value.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 게시물 리스트 - 스크롤 가능한 영역 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border rounded-lg bg-white shadow"
            >
              <div>
                <p className="text-lg font-bold">{post.time}</p>
                <p className="text-sm text-gray-500">{post.location}</p>
                <p className="text-xs text-gray-400">남녀 모두</p>
              </div>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-bold ${
                  post.status === true
                    ? "bg-orange-500 text-white"
                    : "bg-orange-100 text-orange-500"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate("/post");
                }}
              >
                {post.status ? "신청가능" : "인원초과"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardList;
