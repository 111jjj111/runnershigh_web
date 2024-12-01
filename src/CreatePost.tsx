import axios from "axios";
import React, { useState } from "react";
import { data, useNavigate, useSearchParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CreatePost: React.FC = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [title, setTitle] = useState("");
  const [contents, setContent] = useState("");
  const [gender, setGender] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState("black");
  // const [image_url, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const [value, onChange] = useState<Date | null | [Date | null, Date | null]>(
    new Date()
  );
  const [modal, setModal] = useState(false);

  console.log(value?.toLocaleString);

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setImage(event.target.files[0]);
  //   }
  // };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(event.target.value);
  };
  const selectedDate =
    value instanceof Date ? value.toISOString().split("T")[0] : "";
  const createBoard = async () => {
    const sendData = {
      title,
      contents,
      // image_url: image_url ? URL.createObjectURL(image_url) : null,
      gender,
      time,
      date: selectedDate,
    };
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VyTmFtZSI6Iuq5gOyYgeynhCIsImlhdCI6MTczMzA1NjQ5MiwiZXhwIjoxNzMzMTQyODkyfQ.w35JoV90xVKs_A6re_iZ5FUA3Xb4rUWaa5_6R1ytMbo";
    const response = await axios.post(
      "http://113.198.230.24:3338/board/create",
      sendData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
  };

  const handleSubmit = async () => {
    await createBoard();
    setColor("green");
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
          value={contents}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-orange-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
        ></textarea>

        {/* 카테고리 선택 */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border border-orange-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
        >
          <option value="" disabled>
            성별을 선택하세요
          </option>
          <option value="man">남자</option>
          <option value="woman">여자</option>
          <option value="all">모두</option>
        </select>

        <button
          onClick={() => {
            setModal(true);
          }}
        >
          날짜 선택
        </button>

        {modal && (
          <div
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[#00000030] flex items-center justify-center p-6"
            onClick={(event) => {
              event.stopPropagation();
              setModal(false);
            }}
          >
            <Calendar
              onChange={onChange}
              value={value}
              className="m-auto bg-white p-4 rounded-lg space-y-2"
            />
          </div>
        )}

        {/* 시간 선택 */}
        <div className="flex flex-col items-start mt-4">
          <label htmlFor="time-select" className="mb-2 text-lg">
            시간 선택
          </label>
          <select
            id="time-select"
            onChange={handleTimeChange}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">시간을 선택하세요</option>
            {Array.from({ length: 24 }, (_, index) => (
              <option key={index} value={`${index}:00`}>
                {`${index}:00`}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="flex flex-col items-start">
          <label
            htmlFor="image-upload"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          ></label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {image_url && (
            <img
              src={URL.createObjectURL(image_url)}
              alt="Preview"
              className="mt-4 w-full max-h-40 object-cover rounded-lg border border-orange-300"
            />
          )}
        </div> */}

        {/* 버튼 */}
        <div className="flex gap-4">
          <div>{color}</div>
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
