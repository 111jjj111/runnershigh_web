import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VyTmFtZSI6Iuq5gOyYgeynhCIsImlhdCI6MTczMzA1NjQ5MiwiZXhwIjoxNzMzMTQyODkyfQ.w35JoV90xVKs_A6re_iZ5FUA3Xb4rUWaa5_6R1ytMbo";

// 날짜 타입 정의
interface DateItem {
  day: number;
  label: string;
  active: boolean;
}

interface PostItem {
  id: number;
  title: string;
  contents: string;
  image_url: string;
  people: number;
  status: boolean;
  gender: string;
  time: string;
  date: string; // 날짜는 "YYYY-MM-DD" 형식
}

const BoardList: React.FC = () => {
  const [params] = useSearchParams();
  localStorage.setItem("token", token || "");
  const navigate = useNavigate();

  // 날짜 데이터
  const [date, setDate] = useState<DateItem[]>([
    { day: 2, label: "월", active: true }, // 초기 활성 날짜 설정
    { day: 3, label: "화", active: false },
    { day: 4, label: "수", active: false },
  ]);

  // 게시판 데이터
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 현재 선택된 날짜 상태
  const selectedDate = date.find((d) => d.active)?.day;

  useEffect(() => {
    // API 호출
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://113.198.230.24:3338/board/search",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data); // API에서 가져온 데이터 설정
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 선택된 날짜에 해당하는 게시물 필터링
  // 선택된 날짜에 해당하는 게시물 필터링
  const filteredPosts = posts.filter((post) => {
    // 선택된 날짜를 YYYY-MM-DD 형식으로 계산
    const activeDate = new Date();
    activeDate.setDate(selectedDate || activeDate.getDate()); // 선택된 날짜로 설정
    const formattedActiveDate = activeDate.toISOString().split("T")[0];

    return post.date === formattedActiveDate; // 날짜 문자열로 비교
  });

  return (
    <div className="h-screen flex flex-col bg-orange-50/40">
      {/* 헤더 */}
      <header className="p-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">게시판</h1>
          <p className="text-sm text-gray-400 text-center">
            현재위치: 부산광역시 부산진구 엄광로 176
          </p>
        </div>
      </header>

      {/* 날짜 선택 */}
      <div className="p-4">
        <div className="flex gap-2 justify-center">
          {date.map((value, index) => (
            <button
              key={index}
              onClick={() =>
                setDate(
                  date.map((item) =>
                    item.day === value.day
                      ? { ...item, active: true }
                      : { ...item, active: false }
                  )
                )
              }
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg border ${
                value.active
                  ? "bg-orange-500 text-white"
                  : "border-orange-500 text-orange-500 bg-white"
              }`}
            >
              <span className="text-lg font-bold">{value.day}</span>
              <span className="text-sm">{value.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 게시물 리스트 */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">
            선택한 날짜에 게시물이 없습니다.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="flex justify-between items-center p-4 border rounded-lg bg-white shadow"
              >
                <div>
                  <p className="text-lg font-bold">{post.time}</p>
                  <p className="text-sm text-gray-500">{post.title}</p>
                  <p className="text-xs text-gray-400">{post.gender}</p>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    post.status
                      ? "bg-orange-500 text-white"
                      : "bg-orange-100 text-orange-500"
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate("/post/" + post.id);
                  }}
                >
                  {post.status ? "신청가능" : "인원초과"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-8 right-10">
        <button
          className="bg-gray-200 text-black px-6 py-3 rounded-full font-bold shadow w-[60px] h-[60px] flex items-center justify-center text-3xl"
          onClick={() => {
            navigate("/createpost?token=" + token);
          }}
        >
          <img src="svgs/plus.svg" alt="추가" />
        </button>
      </div>
    </div>
  );
};

export default BoardList;
