import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    alert("게시글이 작성되었습니다!");
  };

  return (
    <div className="bg-orange-50 min-h-screen flex flex-col items-center p-4">
      {/* 헤더 */}

      {/* 헤더 */}
      <header className="p-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-orange-500 mb-2">
            게시글 작성
          </h1>
        </div>
      </header>
      {/* 본문 */}
      <main className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 mt-14">
        {/* 제목 입력 */}
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-orange-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />

        {/* 내용 입력 */}
        <textarea
          placeholder="내용을 작성하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-orange-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
        ></textarea>

        {/* 카테고리 선택 */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-orange-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
        >
          <option value="" disabled>
            카테고리를 선택하세요
          </option>
          <option value="general">일반</option>
          <option value="announcement">공지</option>
          <option value="question">질문</option>
        </select>

        {/* 이미지 업로드 */}
        <div className="flex flex-col items-start">
          <label
            htmlFor="image-upload"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            이미지 업로드
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-4 w-full max-h-40 object-cover rounded-lg border border-orange-300"
            />
          )}
        </div>

        {/* 버튼 */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg shadow hover:bg-orange-600 transition"
          >
            작성 완료
          </button>
          <button
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg shadow hover:bg-gray-400 transition"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </button>
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
