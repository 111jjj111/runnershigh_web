import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// 게시물 데이터 타입 정의
interface PostDetails {
  id: number;
  time: string;
  location: string;
  status: "마감임박!" | "신청가능";
  description: string;
}

// 인증 토큰
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VyTmFtZSI6Iuq5gOyYgeynhCIsImlhdCI6MTczMzA1NjQ5MiwiZXhwIjoxNzMzMTQyODkyfQ.w35JoV90xVKs_A6re_iZ5FUA3Xb4rUWaa5_6R1ytMbo";

const PostList: React.FC = () => {
  const { postId } = useParams<{ postId: string }>(); // URL에서 postId 가져오기
  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // API 호출
        const response = await axios.get(
          `http://example.com/api/posts/${postId}`, // 실제 API URL
          {
            headers: {
              Authorization: `Bearer ${token}`, // 인증 토큰 추가
            },
          }
        );
        setPost(response.data); // 데이터 설정
      } catch (error) {
        console.error("Failed to fetch post details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) {
    return (
      <div className="p-4 bg-orange-50/40 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-4 bg-orange-50/40 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">게시글 정보를 가져올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-orange-50/40 min-h-screen pt-12">
      {/* 헤더 */}
      <header className="items-center justify-center p-4 w-full fixed top-0 left-0 z-50  py-1">
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 text-center">
            {post.location}
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
