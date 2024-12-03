import { useEffect, useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal"; // react-modal import

// 게시물 데이터 타입 정의
interface PostDetails {
  id: number;
  title: string;
  contents: string;
  image_url: string | null;
  people: number;
  status: boolean;
  matching: string;
  time: string;
  date: string;
  team: {
    id: number;
  };
}

// 인증 토큰
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VyTmFtZSI6Iuq5gOyYgeynhCIsImlhdCI6MTczMzE2NDkxMSwiZXhwIjoxNzMzMjUxMzExfQ.bppEXQkucF1N4SAGGIFoIf_K2fgkgyH6zZi8j-njsJc";

const PostList: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // API 호출
        const response = await axios.get(
          `https://port-0-runnershigh-bakc-m46t6c3j50881cf3.sel4.cloudtype.app/board/search?team=${postId}`,
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
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 text-center">
            {post.date} | {post.time}
          </p>
        </div>
      </header>

      <img
        src={
          post.image_url ||
          "https://via.placeholder.com/600x400?text=Placeholder+Image"
        }
        alt="게시물 이미지"
        className="w-full h-[14rem] rounded-lg shadow-md mt-16"
      />

      {/* 콘텐츠 간격 확보 */}
      <div className="relative pt-15 p-4 space-y-6 ">
        {/* 게시물 정보 */}
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="text-lg font-bold">모집 현황</p>
          <p className="text-sm text-gray-500">
            {post.people}명 참가 중 | 매칭 유형: {post.matching}
          </p>

          {/* 상태 표시 */}
          <button
            className={`mt-4 px-4 py-2 rounded-lg text-sm font-bold ${
              post.status
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-500"
            }`}
          >
            {post.status ? "신청 가능" : "인원 초과"}
          </button>
        </div>

        {/* 상세 설명 */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">모임 설명</h2>
          <p className="text-sm text-gray-600">{post.contents}</p>
        </div>

        {/* 신청/취소 버튼 */}
        <div className="flex justify-center">
          {post.status ? (
            <button
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold shadow"
              onClick={() => {
                setIsModalOpen(true); // 모달 열기
              }}
            >
              신청하기
            </button>
          ) : (
            <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold shadow">
              신청 불가
            </button>
          )}
        </div>
      </div>

      {/* 모달 구현 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="신청 완료"
        className="bg-white p-6 rounded-lg shadow-md w-[80%] min-w-[200px] max-w-[350px] ratio-[4/3] mx-auto mt-20"
        overlayClassName="bg-black bg-opacity-40 fixed inset-0 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold text-gray-700 mb-4">신청 완료</h2>
        <p className="text-gray-600 mb-6">신청이 완료되었습니다.</p>
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold w-full"
          onClick={() => {
            setIsModalOpen(false);
            navigate("/");
          }}
        >
          확인
        </button>
      </Modal>
    </div>
  );
};

export default PostList;
