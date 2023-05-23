import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import PostPage from "./PostPage";
import UploadBlog from "./UploadBlog";
import UserProfile from "./UserProfile";
import { AuthProvider } from "./AuthContext";
import EditPost from './EditPost';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/UploadBlog" element={<UploadBlog />} />
            <Route exact path="/post/:id" element={<PostPage />} />
            <Route exact path="/user/:ser" element={<UserProfile />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
