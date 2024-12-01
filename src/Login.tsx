import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://113.198.230.24:3338", // API 기본 URL 설정
});

// Axios 인터셉터로 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 헤더에 토큰 추가
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const Login: React.FC = () => {
  const [userID, setId] = useState("");
  const [userPW, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [accessToken, setAccessToken] = useState(""); // 액세스 토큰 상태 추가
  const [refreshToken, setRefreshToken] = useState(""); // 리프레시 토큰 상태 추가
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가
  const navigate = useNavigate();

  // 로컬 스토리지에 토큰 저장 함수
  const saveTokens = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  // 로컬 스토리지에서 토큰 읽기 함수
  const loadTokens = () => {
    const savedAccessToken = localStorage.getItem("accessToken");
    const savedRefreshToken = localStorage.getItem("refreshToken");
    if (savedAccessToken) setAccessToken(savedAccessToken);
    if (savedRefreshToken) setRefreshToken(savedRefreshToken);
  };

  // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 토큰 읽기
  useEffect(() => {
    loadTokens();
  }, []);

  const handleLogin = async () => {
    if (!userID.trim() || !userPW.trim()) {
      setErrorMessage("ID와 Password를 입력하세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post("/user/login", {
        userID,
        userPW,
      });

      console.log("Login Response:", response.data);

      const { access, refresh } = response.data;

      if (access && refresh) {
        setAccessToken(access);
        setRefreshToken(refresh);
        saveTokens(access, refresh);
        setId("");
        setPassword("");
        alert("Login successful!");
        navigate("/");
      } else {
        setErrorMessage("Login failed. Tokens not received.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Login failed. Please try again."
        );
      } else {
        setErrorMessage("An unexpected error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setAccessToken("");
    setRefreshToken("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("Logged out successfully.");
    window.location.reload(); // 로그아웃 후 화면 새로고침
  };

  const handleJoinUs = () => {
    navigate("/register");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50/40">
      <div className="bg-white rounded-lg shadow-md p-6 w-80 text-center">
        <div className="mb-6">
          <svg
            xmlns="svgs/loginProfile.svg"
            height="80"
            viewBox="0 96 960 960"
            width="80"
            fill="#FF6F61"
            className="mx-auto"
          >
            <circle cx="480" cy="336" r="120" />
            <path d="M480 576q-102 0-189 47t-135 128q-6 9-6 19t6 19q48 81 135 128t189 47q102 0 189-47t135-128q6-9 6-19t-6-19q-48-81-135-128t-189-47Z" />
          </svg>
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

        {!accessToken ? (
          <>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={userID}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="password"
                placeholder="PW"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={userPW}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <button
                className="w-full bg-orange-500 text-white font-bold py-2 rounded-md hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
              <button
                className="w-full border-2 border-orange-500 text-orange-500 font-bold py-2 rounded-md hover:bg-orange-500 hover:text-white"
                onClick={handleJoinUs}
              >
                Join Us
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-green-600 text-sm">You are logged in.</p>
            <button
              className="w-full bg-red-500 text-white font-bold py-2 rounded-md hover:bg-red-600"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
