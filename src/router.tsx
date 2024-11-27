import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import BoardList from "./BoardList";
import PostList from "./PostList";
import RankingList from "./RankingList";
import Mission from "./Mission";
import CreatePost from "./CreatePost";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardList />}></Route>
        <Route path="/post" element={<PostList />}></Route>
        <Route path="/ranking" element={<RankingList />}></Route>
        <Route path="/mission" element={<Mission />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
