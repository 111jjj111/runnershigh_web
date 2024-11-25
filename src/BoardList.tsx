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

// // 게시물 타입 정의
// interface PostItem {
//   time: string;
//   location: string;
//   status: boolean;
// }

const BoardList: React.FC = ({}) => {
  const navigate = useNavigate();
  // 날짜 데이터
  const dates: DateItem[] = [
    { day: 12, label: "화", active: true },
    { day: 13, label: "수", active: false },
    { day: 14, label: "목", active: false },
  ];

  // 게시물 데이터
  // const posts: PostItem[] = [
  //   { time: "11:00", location: "부산 광안리해수욕장", status: true },
  //   { time: "11:00", location: "부산 광안리해수욕장", status: true },
  //   { time: "11:00", location: "부산 광안리해수욕장", status: true },
  //   { time: "11:00", location: "부산 광안리해수욕장", status: true },
  //   { time: "11:00", location: "부산 광안리해수욕장", status: true },
  //   { time: "11:00", location: "부산 광안리해수욕장", status: true },
  //   { time: "11:00", location: "부산 광안리해수욕장", status: true },
  //   { time: "11:00", location: "부산 광안리해수욕장", status: true },
  // ];

  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      {/* 헤더 */}
      <header className="bg-grey-50 p-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-[#FF512A] mb-2 text-center">
            게시판
          </h1>
          <p className="text-sm text-[#FF512A] text-center">
            현재위치: 부산광역시 부산진구 엄광로 176
          </p>
        </div>
      </header>

      {/* 날짜 선택 */}
      <div className="p-4 item">
        <div className="flex gap-2">
          {dates.map((date) => (
            <button
              key={date.day}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg border
              ${
                date.active
                  ? "bg-orange-500 text-white"
                  : "border-orange-500 text-orange-500"
              }`}
            >
              <span className="text-lg font-bold">{date.day}</span>
              <span className="text-sm">{date.label}</span>
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
                {post.status}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardList;
