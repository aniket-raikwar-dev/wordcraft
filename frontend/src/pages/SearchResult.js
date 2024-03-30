import React, { useState, useEffect } from "react";
import { Skeleton, Tabs } from "antd";
import { api } from "../services/baseApi";
import BlogPost from "../components/BlogPost";
import UserBox from "../components/UserBox";
import { useSelector } from "react-redux";
import AliceImage from "../images/NoDataFound.png";

const SearchResult = () => {
  const [blogData, setBlogData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showBlogData, setShowBlogData] = useState([]);
  const [showUserData, setShowUserData] = useState([]);
  const [loading, setLoading] = useState([]);

  const searchText = useSelector((state) => state.searchData.text);

  useEffect(() => {
    fetchBlogData();
  }, []);

  useEffect(() => {
    filterSearchResults();
  }, [searchText]);

  const filterSearchResults = () => {
    if (searchText.length === 0) {
      setShowBlogData(blogData);
      setShowUserData(userData);
    } else {
      const blogResult = blogData?.filter((blog) =>
        blog.title.toLowerCase().includes(searchText)
      );

      const userResult = userData?.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText) ||
          user.username.toLowerCase().includes(searchText)
      );
      setShowBlogData(blogResult);
      setShowUserData(userResult);
    }
  };

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/post/all");
      const data = res?.data?.data;
      setBlogData(data);
      setShowBlogData(data);
      fetchUserData();
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await api.get("/users/all");
      const data = res?.data?.data;
      setUserData(data);
      setShowUserData(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Blogs",
      children: (
        <div>
          {showBlogData.length > 0 ? (
            showBlogData.map((blog) => (
              <BlogPost key={blog._id} blogData={blog} allUsers={userData} />
            ))
          ) : (
            <div className="h-full w-full bg-[#fff] flex flex-col justify-center items-center rounded-md py-20">
              <img className="w-[60%]" src={AliceImage} alt="" />
              <h3 className="work-head">No Result Found.</h3>
              <h5 className="stay-tuned">SEARCH SOMETHING THAT EXIST.</h5>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Users",
      children: (
        <div>
          {showUserData.length > 0 ? (
            showUserData.map((user) => (
              <div className="mb-4">
                <UserBox user={user} />
              </div>
            ))
          ) : (
            <div className="h-full w-full bg-[#fff] flex flex-col justify-center items-center rounded-md py-20">
              <img className="w-[60%]" src={AliceImage} alt="" />
              <h3 className="work-head">No Result Found.</h3>
              <h5 className="stay-tuned">SEARCH SOMETHING THAT EXIST.</h5>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="main-content-container">
      <h2 className="current-page-head">Search Result's</h2>
      <div className="scrollable-container">
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>
    </div>
  );
};

export default SearchResult;
