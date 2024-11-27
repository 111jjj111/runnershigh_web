import { useEffect, useState } from "react";
import React from "react";
import { posts } from "./contents/postItem";

//게시물 데이터 타입 정의
interface PostDetails {
  time: string;
  location: string;
  status: "마감임박!" | "신청가능";
  description: string;
}

const PostList: React.FC = () => {
  // 선택된 게시물 데이터
  const post: PostDetails = {
    time: "11:00",
    location: "부산 광안리해수욕장",
    status: "신청가능",
    description:
      "이 모임은 매주 수요일 오전 11시에 부산 광안리 해수욕장에서 진행됩니다. 남녀 모두 참여 가능하며, 참가 신청은 사전에 완료해야 합니다. 준비물로는 러닝화와 물을 챙겨주시기 바랍니다.",
  };

  return (
    <div className="p-4 bg-orange-50/40 min-h-screen pt-12">
      {/* 헤더 */}
      <header className="items-center justify-center p-4 w-full fixed top-0 left-0 z-50  py-1">
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 text-center">
            부산 광안리해수욕장
          </h1>
          <p className="text-sm text-gray-500 text-center">
            현재위치: 부산광역시 부산진구 엄광로 176
          </p>
        </div>
      </header>
      <img
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MjdfMjM2%2FMDAxNzI3NDE1NDc1NzUy.41PzRGTkgr-2YjdxBKQ4X3rlIV-dF16RkXTVXlpJH2Eg.TkaGAY7WS8tC5TRLqfDFAb0nZ4D1LF_PUfOtqZq70lQg.JPEG%2FDSC_1063.jpg&type=sc960_832"
        alt="Placeholder Image"
        className="w-full h-[14rem] rounded-lg shadow-md mt-16"
      />
      {/* 콘텐츠 간격 확보 */}
      <div className="relative pt-15 p-4 space-y-6 ">
        {/* 게시물 정보 */}
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="text-lg font-bold">{post.time}</p>
          <p className="text-sm text-gray-500">{post.location}</p>

          {/* 상태 표시 */}
          <button
            className={`mt-4 px-4 py-2 rounded-lg text-sm font-bold ${
              post.status === "마감임박!"
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-500"
            }`}
          >
            {post.status}
          </button>
        </div>

        {/* 상세 설명 */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">모임 설명</h2>
          <p className="text-sm text-gray-600">{post.description}</p>
        </div>

        {/* 신청/취소 버튼 */}
        <div className="flex justify-center">
          {post.status === "신청가능" ? (
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold shadow">
              신청하기
            </button>
          ) : (
            <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold shadow">
              신청 불가
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;
