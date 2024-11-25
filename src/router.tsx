import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import BoardList from "./BoardList";
import PostList from "./PostList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardList />}></Route>
        <Route path="/post" element={<PostList />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
