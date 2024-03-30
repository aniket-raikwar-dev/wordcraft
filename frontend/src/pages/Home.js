import React, { useState, useEffect } from "react";
import { api } from "../services/baseApi";
import BlogPost from "../components/BlogPost";
import { Skeleton } from "antd";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/actions/userDataAction";
import AliceImage from "../images/NoDataFound.png";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();

  const fetchAllBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("post/all");
      setBlogs(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await api.get("/users/all");
      const users = res?.data?.data;
      setAllUsers(users);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchUserDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const { id } = jwtDecode(token);
      const resp = await api.get(`/users/profile/${id}`);
      const user = resp?.data?.data;
      dispatch(setUserData(user));
    } catch (err) {
      console.log("error: ", err);
    }
  };

  useEffect(() => {
    fetchAllBlogPosts();
    fetchUserDetail();
    fetchAllUsers();
  }, []);

  return (
    <div className="main-content-container">
      <h2 className="current-page-head">Explore</h2>
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
            <BlogPost key={blog._id} blogData={blog} allUsers={allUsers} />
          ))
        ) : (
          <div className="h-full w-full bg-[#fff] flex flex-col justify-center items-center rounded-md">
            <img className="w-[50%]" src={AliceImage} alt="" />
            <p className="font-medium text-md">
              No Blogs Found. Create New One.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
