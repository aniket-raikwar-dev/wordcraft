import React, { useState, useEffect } from "react";
import UserBanner from "../images/userBackgroundBanner.png";
import { Skeleton, Tabs, Tooltip } from "antd";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../services/baseApi";
import { createUserProfileImage } from "../utils/createUserProfile";
import { convertHtmlToString } from "../utils/convertHtmlToString";
import AliceImage from "../images/NoDataFound.png";
import WorkUnderProgress from "../images/workUnderProgress.png";

const UserDetail = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);

  const author = useSelector((state) => state.userData.data);
  const { id: userId } = useParams();

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    try {
      setLoading(true);
      const resp = await api.get(`/users/profile/${userId}`);
      const user = resp?.data?.data;
      user.isFollowed = author?.following?.includes(user._id);
      setUserData(user);
      fetchAllBlogPosts(user?._id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchAllBlogPosts = async (id) => {
    try {
      const response = await api.get("post/all");
      const blogs = response?.data?.data;
      const likedBlogs = blogs.filter((blog) => blog.likes.includes(id));
      setLikedPosts(likedBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowed = async () => {
    try {
      const updatedUser = {
        ...userData,
        isFollowed: !userData.isFollowed,
      };
      setUserData(updatedUser);
      await api.get(`users/following/${userData?._id}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Posts",
      children: (
        <div>
          {userData?.posts?.length > 0 ? (
            <div class="user-media-grid-container">
              {userData?.posts?.map((post) => (
                <div key={post?._id} class="user-media-post-box">
                  <div>
                    <div className="media-post-banner">
                      <img src={post?.image} alt="" />
                    </div>
                    <h4 className="font-medium px-2 pt-1">
                      {post?.title.length > 24
                        ? `${post?.title.slice(0, 24)}...`
                        : post?.title}
                    </h4>
                    <p className="font-normal text-xs px-2">
                      {convertHtmlToString(post?.description)}
                    </p>
                  </div>
                  <Link className="media-2nd-child" to={`/blog/${post?._id}`}>
                    <div>
                      <Tooltip placement="top" title="View">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z"></path>
                        </svg>
                      </Tooltip>
                    </div>
                    <div className="cursor-pointer">view</div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full bg-[#fff] flex flex-col justify-center items-center rounded-md">
              <img className="alice-img" src={AliceImage} alt="" />
              <h3 className="work-head">No Blog Post Found.</h3>
              <h5 className="stay-tuned">Create New One to See.</h5>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Likes",
      children: (
        <div>
          {likedPosts?.length > 0 ? (
            <div class="user-media-grid-container">
              {likedPosts?.map((post) => (
                <div key={post?._id} class="user-media-post-box">
                  <div>
                    <div className="media-post-banner">
                      <img src={post?.image} alt="" />
                    </div>
                    <h4 className="font-medium px-2 pt-1">
                      {post?.title.length > 24
                        ? `${post?.title.slice(0, 24)}...`
                        : post?.title}
                    </h4>
                    <p className="font-normal text-xs px-2">
                      {convertHtmlToString(post?.description)}
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
                        <p>{post?.likes?.length}</p>
                      </div>
                      <div className="ml-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="rgba(28,91,239,1)"
                        >
                          <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242Z"></path>
                        </svg>
                        <p>{post?.comments?.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full bg-[#fff] flex flex-col justify-center items-center rounded-md">
              <img className="alice-img" src={AliceImage} alt="" />
              <h3 className="work-head">No Blog Post Found.</h3>
              <h5 className="stay-tuned">Please Liked Any Post to See.</h5>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: "Highlights",
      children: (
        <div className="h-full w-full bg-[#fff] flex flex-col justify-center items-center rounded-md">
          <img className="alice-img" src={WorkUnderProgress} alt="" />
          <h3 className="work-head">Working Under Progress.</h3>
          <h5 className="stay-tuned">STAY TUNED, FOR MORE UPDATES.</h5>
        </div>
      ),
    },
    {
      key: "4",
      label: "Media",
      children: (
        <div className="h-full w-full bg-[#fff] flex flex-col justify-center items-center rounded-md">
          <img className="alice-img" src={WorkUnderProgress} alt="" />
          <h3 className="work-head">Working Under Progress.</h3>
          <h5 className="stay-tuned">STAY TUNED, FOR MORE UPDATES.</h5>
        </div>
      ),
    },
  ];

  return (
    <div className="main-content-container ">
      <h2 className="current-page-head">User Details</h2>
      <div className="scrollable-container">
        {loading ? (
          <div className="user-container">
            <Skeleton avatar paragraph={{ rows: 18 }} active />
          </div>
        ) : (
          <div className="user-detail-container">
            <div className="user-banner">
              <img src={UserBanner} alt="" />
            </div>
            <div className="big-user-box">
              <div className="big-user-profile">
                {userData?.profilePhoto ? (
                  <img src={userData?.profilePhoto} alt="" />
                ) : (
                  userData?.name?.length > 0 &&
                  createUserProfileImage(userData?.name)
                )}
              </div>
              <div
                className={
                  userData?.isFollowed
                    ? "profile-btn-following"
                    : "edit-profile-btn"
                }
                onClick={handleFollowed}
              >
                {userData?.isFollowed ? "Following" : "Follow"}
              </div>
            </div>
            <div className="user-detail-content">
              <h3>{userData?.name}</h3>
              <p>@{userData?.username}</p>
              <h5>
                {userData?.bio ? userData?.bio : "No Bio Available (Set Bio)"}
              </h5>
              <div style={{ marginLeft: "-3px" }} className="flex mt-3">
                {userData?.location && (
                  <div className="flex">
                    <div style={{ width: "15px" }} className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
                      </svg>
                    </div>
                    <p>{userData?.location}</p>
                  </div>
                )}

                {userData?.link && (
                  <div className="flex ml-5">
                    <div style={{ width: "15px" }} className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.3638 15.5355L16.9496 14.1213L18.3638 12.7071C20.3164 10.7545 20.3164 7.58866 18.3638 5.63604C16.4112 3.68341 13.2453 3.68341 11.2927 5.63604L9.87849 7.05025L8.46428 5.63604L9.87849 4.22182C12.6122 1.48815 17.0443 1.48815 19.778 4.22182C22.5117 6.95549 22.5117 11.3876 19.778 14.1213L18.3638 15.5355ZM15.5353 18.364L14.1211 19.7782C11.3875 22.5118 6.95531 22.5118 4.22164 19.7782C1.48797 17.0445 1.48797 12.6123 4.22164 9.87868L5.63585 8.46446L7.05007 9.87868L5.63585 11.2929C3.68323 13.2455 3.68323 16.4113 5.63585 18.364C7.58847 20.3166 10.7543 20.3166 12.7069 18.364L14.1211 16.9497L15.5353 18.364ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"></path>
                      </svg>
                    </div>
                    <p>
                      <a
                        href={userData?.link}
                        target="_blank"
                        className="website-link"
                      >
                        {userData?.link}
                      </a>
                    </p>
                  </div>
                )}
              </div>

              <div className="follower-box">
                <p>FOLLOWERS: 12</p>
                <div className="vr-line"></div>
                <p>FOLLOWING: 3</p>
              </div>
            </div>
            <div className="user-detail-media">
              <Tabs defaultActiveKey="1" items={tabItems} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
