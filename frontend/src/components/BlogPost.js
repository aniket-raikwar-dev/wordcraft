import React, { useEffect, useState } from "react";
import FrokestImg from "../images/frokest.jpeg";
import { Link } from "react-router-dom";
import { createUserProfileImage } from "../utils/createUserProfile";
import { useSelector } from "react-redux";
import { api } from "../services/baseApi";
import moment from "moment";
import CommentSection from "./CommentSection";

const BlogPost = ({ key, blogData, allUsers }) => {
  const [blog, setBlog] = useState(blogData);
  const [open, setOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const userData = useSelector((state) => state.userData.data);

  const getUserWhoLikedPost = () => {
    let result = "";
    const likedUsers = allUsers?.filter((user) =>
      blogData?.likes?.includes(user?._id)
    );
    if (likedUsers.length === 0) {
      result = "You are the first person to like this post.";
    } else if (likedUsers.length === 1) {
      result = `${
        likedUsers[0].name.split(" ")[0]
      } is the only one who liked this post`;
    } else if (likedUsers.length === 2) {
      result = `${likedUsers[0].name.split(" ")[0]} and ${
        likedUsers[1].name.split(" ")[0]
      } liked this post`;
    } else {
      result = `${likedUsers[0].name.split(" ")[0]}, ${
        likedUsers[1].name.split(" ")[0]
      } and ${likedUsers.length - 2} others liked this post`;
    }
    return result;
  };

  useEffect(() => {
    setBlog(blogData);
  }, []);

  const handleLike = async () => {
    try {
      setBlog((prevData) => ({
        ...prevData,
        isLiked: !prevData.isLiked,
      }));
      await api.get(`/post/likes/${blog._id}`);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleBookmark = async () => {
    try {
      setBlog((prevData) => ({
        ...prevData,
        isBookmarked: !prevData.isBookmarked,
      }));
      await api.get(`/post/bookmark/${blog._id}`);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const convertHtmlToString = (html) => {
    const stripHtml = html.replace(/<[^>]*>/g, "");
    return `${stripHtml.slice(0, 190)}...`;
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  return (
    <>
      <div key={key} className="post-container">
        <div>
          <div className="flex justify-between items-center">
            <div className="new-user-item">
              <div className="new-user-profile-post">
                {blog?.user?.profilePhoto ? (
                  <img src={blog?.user?.profilePhoto} alt="" />
                ) : (
                  blog?.user?.name?.length > 0 &&
                  createUserProfileImage(blog?.user?.name)
                )}
              </div>
              <div className="new-user-name-post">
                <p
                  style={{ fontSize: "13.5px" }}
                  className="user-full-name-post"
                >
                  {blog?.user?.name}
                </p>
                <p className="user-name-text-post">@{blog?.user?.username}</p>
              </div>
            </div>
            <div>
              <p className="outer-publish">Published on: </p>
              <p className="date">
                {moment(blog?.createdAt).format("D MMMM, YYYY")}
              </p>
            </div>
          </div>
          <Link
            to={`/blog/${blog._id}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <div className="post-content-box mt-2">
              <div className="content-box">
                <h3 className="content-head">
                  {blog?.title.length > 50
                    ? `${blog?.title?.slice(0, 50)}...`
                    : blog?.title}
                </h3>
                <p className="content-desc mt-1">
                  {convertHtmlToString(blog?.description)}
                </p>
              </div>
              <div className="content-img-div">
                <img className="content-img" src={blog?.image} alt="" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="people-div">
                <div className="w-[14px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(18,39,228,1)"
                  >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12H15C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12H7Z"></path>
                  </svg>
                </div>
              </div>
              <p className="people-name">{getUserWhoLikedPost()}</p>
            </div>
          </Link>
        </div>
        <div className="shortcut-container">
          <div className="flex items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleLike}
            >
              <div className="shortcut-icon">
                {blog?.isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(255,5,76,1)"
                  >
                    <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                  </svg>
                )}
              </div>
              <p className="shortcut-text">{blog?.likes.length} Likes</p>
            </div>
            <div
              className="flex items-center ml-8 cursor-pointer"
              onClick={showDrawer}
            >
              <div className="shortcut-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22H2L4.92893 19.0711C3.11929 17.2614 2 14.7614 2 12ZM6.82843 20H12C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 14.1524 4.85124 16.1649 6.34315 17.6569L7.75736 19.0711L6.82843 20ZM8 13H16C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13Z"></path>
                </svg>
              </div>
              <p className="shortcut-text">
                {commentCount === 0 ? blog?.comments.length : commentCount}{" "}
                Comments
              </p>
            </div>
          </div>
          <div className="tags-div">
            <div className="flex items-center">
              {blog?.tags?.map((tag, index) => (
                <div key={index} className="tag">
                  {tag}
                </div>
              ))}
            </div>
            <div className="bookmark-line"></div>
            <div className="shortcut-icon laptop" onClick={handleBookmark}>
              {blog?.isBookmarked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path>
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      <CommentSection
        userData={userData}
        blogId={blog?._id}
        open={open}
        onClose={onClose}
        setCommentCount={setCommentCount}
      />
    </>
  );
};

export default BlogPost;
