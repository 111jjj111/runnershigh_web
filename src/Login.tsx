import React from "react";
import axios from "axios";

const Login: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50/40">
      <div className="bg-white rounded-lg shadow-md p-6 w-80 text-center">
        {/* 프로필 아이콘 */}
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

        {/* ID와 PW 입력창 */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="PW"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* 로그인 및 회원가입 버튼 */}
        <div className="space-y-4">
          <button className="w-full bg-orange-500 text-white font-bold py-2 rounded-md hover:bg-orange-600">
            Log In
          </button>
          <button className="w-full border-2 border-orange-500 text-orange-500 font-bold py-2 rounded-md hover:bg-orange-500 hover:text-white">
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
