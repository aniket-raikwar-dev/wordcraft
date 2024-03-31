import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/baseApi";
import { Skeleton } from "antd";
// import { createUserProfileImage } from "../utils/createUserProfile";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import CommentSection from "../components/CommentSection";
import { convertHtmlToString } from "../utils/convertHtmlToString";

const BlogPostDetail = () => {
  const [open, setOpen] = useState(false);
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [commentCount, setCommentCount] = useState(0);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const { id: blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogPostDetail();
    fetchAuthorDetail();
  }, []);

  const fetchAuthorDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const { id } = jwtDecode(token);
      const resp = await api.get(`/users/profile/${id}`);
      const user = resp?.data?.data;
      console.log("user: ", user);
      setUserData(user);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const fetchBlogUserDetail = async (id) => {
    try {
      const resp = await api.get(`/users/profile/${id}`);
      const user = resp?.data?.data;
      const allBlogs = user?.posts;
      const otherBlogs = allBlogs.filter((blog) => blog?._id !== blogId);
      setOtherBlogs(otherBlogs);
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchBlogPostDetail = async (currentId = blogId) => {
    try {
      setLoading(true);
      const resp = await api.get(`/post/detail/${currentId}`);
      const data = resp?.data?.data;
      setBlogData(data);
      fetchBlogUserDetail(data?.user?._id);
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleLike = async () => {
    try {
      setBlogData((prevData) => ({
        ...prevData,
        isLiked: !prevData.isLiked,
        // likes: prevData.isLiked
        //   ? prevData.likes.filter((like) => like !== userData._id)
        //   : [...prevData.likes, userData._id],
      }));
      await api.get(`/post/likes/${blogId}`);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleBookmark = async () => {
    try {
      setBlogData((prevData) => ({
        ...prevData,
        isBookmarked: !prevData.isBookmarked,
        bookmarks: prevData.isBookmarked
          ? prevData.bookmarks.filter((bookmark) => bookmark !== userData._id)
          : [...prevData.bookmarks, userData._id],
      }));
      await api.get(`/post/bookmark/${blogId}`);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleNavigate = (blogId) => {
    navigate(`/blog/${blogId}`);
    fetchBlogPostDetail(blogId);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <div className="scrollable-container pad-8">
          <Skeleton avatar paragraph={{ rows: 15 }} active />
        </div>
      ) : (
        <div className="scrollable-container pad-8">
          <div className="flex justify-between items-center mb-3">
            <div className="new-user-item">
              <div className="new-user-profile-post">
                {blogData?.user?.profilePhoto ? (
                  <img src={blogData?.user?.profilePhoto} alt="" />
                ) : (
                  "AR"
                )}
              </div>
              <div className="new-user-name-post">
                <p className="user-full-name-post">{blogData?.user?.name}</p>
                <p className="user-name-text-post">
                  @{blogData?.user?.username}
                </p>
              </div>
            </div>
            <div>
              <p className="inner-publish ">Published on: </p>
              <p className="date">
                {moment(blogData?.createdAt).format("D MMMM, YYYY")}
              </p>
            </div>
          </div>
          <hr />
          <h2 className="font-bold text-2xl lg:text-3xl mt-5 mb-5">
            {blogData?.title}
          </h2>

          <div className="h-[250px] lg:h-[350px] mt-5">
            <img
              className="rounded-md object-cover w-full h-full"
              src={blogData?.image}
              alt=""
            />
          </div>
          <div className="flex items-center mt-6">
            {blogData?.tags?.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
              </div>
            ))}
          </div>

          <div className="border-y flex justify-between py-2 mt-6">
            <div className="flex items-center">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleLike}
              >
                <div className="shortcut-icon">
                  {blogData.isLiked ? (
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
                <p className="shortcut-text">{blogData?.likes?.length} Likes</p>
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
                  {commentCount === 0
                    ? blogData?.comments?.length
                    : commentCount}{" "}
                  Comments
                </p>
              </div>
            </div>

            <div className="shortcut-icon" onClick={handleBookmark}>
              {blogData?.isBookmarked ? (
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

          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: blogData?.description }}
          />

          {otherBlogs.length > 0 && (
            <div className="mt-20">
              <h3 className="more-from-text">
                More Blogs from{" "}
                <span style={{ color: "#004aec" }}>{blogData?.user?.name}</span>
              </h3>
              <hr />
              <div class="blog-detail-grid mt-6">
                {otherBlogs?.map((blog) => (
                  <div key={blog?._id} class="blog-detail-post-box">
                    <div onClick={() => handleNavigate(blog?._id)}>
                      <div className="blog-detail-post-banner">
                        <img src={blog.image} alt="" />
                      </div>
                      <h4 className="font-semibold text-lg px-2 pt-1">
                        {blog?.title.length > 24
                          ? `${blog?.title.slice(0, 24)}...`
                          : blog?.title}
                      </h4>
                      <p className="font-normal text-sm px-2">
                        {convertHtmlToString(blog?.description)}
                      </p>
                    </div>
                    <div className="media-2nd-child">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z"></path>
                        </svg>
                      </div>
                      <div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="rgba(227,25,75,1)"
                          >
                            <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
                          </svg>
                          <p>{blog?.likes?.length}</p>
                        </div>
                        <div className="ml-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="rgba(28,91,239,1)"
                          >
                            <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242Z"></path>
                          </svg>
                          <p>{blog?.comments?.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <CommentSection
            userData={userData}
            blogId={blogId}
            open={open}
            onClose={onClose}
            setCommentCount={setCommentCount}
          />
        </div>
      )}
    </>
  );
};

export default BlogPostDetail;
