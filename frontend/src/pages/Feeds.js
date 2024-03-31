import React, { useState, useEffect } from "react";
import { api } from "../services/baseApi";
import { Skeleton } from "antd";
import AliceImage from "../images/NoDataFound.png";
import BlogPost from "../components/BlogPost";

const Feeds = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchFeedBlogPosts();
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

  const fetchFeedBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("post/all");
      const blogs = response.data.data;
      const followingResponse = await api.get("/users/profile");
      const following = followingResponse?.data?.data?.following;
      const feedBlogs = blogs.filter((blog) => {
        return following.includes(blog.user._id);
      });
      fetchAllUsers();
      setBlogs(feedBlogs);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="main-content-container ">
      <h2 className="current-page-head">Feeds</h2>
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
            <img className="alice-img" src={AliceImage} alt="" />{" "}
            <h3 className="work-head">No Feeds Available.</h3>
            <h5 className="stay-tuned">Followed Someone to See the Blogs.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feeds;
