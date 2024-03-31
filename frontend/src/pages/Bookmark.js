import React, { useState, useEffect } from "react";
import { api } from "../services/baseApi";
import { Skeleton } from "antd";
import AliceImage from "../images/NoDataFound.png";
import BlogPost from "../components/BlogPost";
import { jwtDecode } from "jwt-decode";

const Bookmark = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchMyBlogPosts();
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await api.get("/users/all");
      const users = res?.data?.data;
      setAllUsers(users);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchMyBlogPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { id } = jwtDecode(token);
      const response = await api.get("post/all");
      const blogs = response.data.data;
      const bookmarkBlogs = blogs.filter((blog) => {
        if (blog.bookmarks.includes(id)) return true;
        else return false;
      });
      setBlogs(bookmarkBlogs);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    }
  };

  return (
    <div className="main-content-container ">
      <h2 className="current-page-head">Bookmarks</h2>
      <div className="scrollable-container">
        {loading ? (
          <div>
            <div className="post-container">
              <Skeleton avatar paragraph={{ rows: 7 }} active />
            </div>
            <div className="post-container">
              <Skeleton avatar paragraph={{ rows: 7 }} active />
            </div>
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogPost key={blog.id} blogData={blog} allUsers={allUsers} />
          ))
        ) : (
          <div className="h-full w-full bg-[#fff] flex flex-col justify-center items-center rounded-md">
            <img className="alice-img" src={AliceImage} alt="" />
            <h3 className="work-head">Nothing is Bookmarked.</h3>
            <h5 className="stay-tuned">Bookmarked Any Post.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
