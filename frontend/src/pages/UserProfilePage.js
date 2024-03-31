import React, { useEffect, useState } from "react";
import UserBanner from "../images/userBackgroundBanner.png";
import { Skeleton, Tabs } from "antd";
import { userIsLogin } from "../redux/actions/userAuthAction";
import { useDispatch } from "react-redux";
import { api } from "../services/baseApi";
import { Grid } from "react-loader-spinner";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Upload, Modal, Tooltip } from "antd";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { convertHtmlToString } from "../utils/convertHtmlToString";
import AliceImage from "../images/NoDataFound.png";
import WorkUnderProgress from "../images/workUnderProgress.png";
import DiscardImage from "../images/discardImg.png";
import { createUserProfileImage } from "../utils/createUserProfile";
import LogoutMotion from "../images/logoutMotion.gif";

const UserProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [imageFile, setImageFile] = useState([]);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [deletedBlogId, setDeletedBlogId] = useState("");
  const token = localStorage.getItem("token");
  const { id } = jwtDecode(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfileData();
    fetchAllBlogPosts();
  }, []);

  const fetchUserProfileData = async () => {
    try {
      setLoading(true);
      const resp = await api.get(`/users/profile/${id}`);
      const user = resp?.data?.data;
      setUserData(user);
      setName(user.name);
      setUserName(user.username);
      setBio(user.bio);
      setLocation(user.location);
      setWebsiteLink(user.link);
      setLoading(false);
      setIsModalOpen(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchAllBlogPosts = async () => {
    try {
      const response = await api.get("post/all");
      const blogs = response?.data?.data;
      const likedBlogs = blogs.filter((blog) => blog.likes.includes(id));
      setLikedPosts(likedBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfile = async () => {
    try {
      setUpdating(true);

      const formData = new FormData();
      formData.set("name", name);
      formData.set("username", userName);
      formData.set("bio", bio);
      formData.set("location", location);
      formData.set("link", websiteLink);
      formData.set("profile", imageFile);

      const resp = await api.put("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUserProfileData();
      setUpdating(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleImageFile = (file) => {
    setUploadingImg(true);
    setTimeout(() => {
      setImageFile(file);
      setUploadingImg(false);
    }, 1000);
  };

  const handleDeleteBlog = async () => {
    try {
      await api.delete(`/post/delete/${deletedBlogId}`);
      setIsDeleteOpen(false);
      fetchUserProfileData();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showDeleteModal = (blogId) => {
    setDeletedBlogId(blogId);
    setIsDeleteOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDeleteOpen(false);
    setIsLogoutModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(userIsLogin(false));
    localStorage.clear();
    navigate("/login");
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
                  <Link
                    style={{ color: "#000", textDecoration: "none" }}
                    to={`/blog/${post?._id}`}
                  >
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
                  </Link>
                  <div className="media-2nd-child">
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
                    <div>
                      <Link to={`/edit-blog/${post?._id}`}>
                        <Tooltip placement="top" title="Edit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                          </svg>
                        </Tooltip>
                      </Link>

                      <div
                        className="ml-4"
                        onClick={() => showDeleteModal(post?._id)}
                      >
                        <Tooltip placement="top" title="Delete">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M20 7V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V7H2V5H22V7H20ZM6 7V20H18V7H6ZM7 2H17V4H7V2ZM11 10H13V17H11V10Z"></path>
                          </svg>
                        </Tooltip>
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
                  <Link
                    style={{ color: "#000", textDecoration: "none" }}
                    to={`/blog/${post?._id}`}
                  >
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
                  </Link>
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
    <div className="main-content-container">
      <h2 className="current-page-head">User Profile</h2>
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
              <div className="edit-profile-btn" onClick={showModal}>
                Edit Profile
              </div>
            </div>
            <div className="user-detail-content">
              <h3>{userData?.name}</h3>
              <p>@{userData?.username}</p>
              <h5>
                {userData?.bio ? userData?.bio : "No Bio Available (Set Bio)"}
              </h5>
              <div
                style={{ marginLeft: "-3px" }}
                className="flex flex-wrap mt-3"
              >
                {userData?.location && (
                  <div className="flex">
                    <div style={{ width: "14px" }} className="mr-1">
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
                    <div style={{ width: "14px" }} className="mr-1">
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
                        {userData?.link.length > 50
                          ? `${userData?.link.slice(0, 50)}...`
                          : userData?.link}
                      </a>
                    </p>
                  </div>
                )}
              </div>
              <div style={{ marginLeft: "-2px" }} className="flex mt-3">
                <div style={{ width: "14px" }} className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM11 13V17H6V13H11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
                  </svg>
                </div>
                <p>
                  Joined WordCraft:{" "}
                  <span>
                    {moment(userData?.createdAt).format("D MMMM, YYYY")}
                  </span>
                </p>
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

            <div className="btn-sm-logout flex justify-center">
              <div
                style={{ display: "flex", height: "35px" }}
                className="btn-create-new-blog"
                onClick={() => setIsLogoutModalOpen(true)}
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="edit-profile-box">
          <hr />
          {updating ? (
            <div className="flex justify-center flex-col items-center h-[500px]">
              <Grid
                visible={true}
                height="80"
                width="80"
                color="#3d2df0"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass="grid-wrapper"
              />
              <h2 className="mt-12 font-medium text-xl">
                Updating Your Profile Data.
              </h2>
              <p className="mt-1 font-normal text-sm text-[#2d40f0]">
                It takes some times.
              </p>
            </div>
          ) : (
            <div>
              <div className="mt-4">
                <Upload
                  beforeUpload={() => false}
                  onChange={(info) => handleImageFile(info.file)}
                >
                  <Button
                    icon={
                      uploadingImg ? <LoadingOutlined /> : <UploadOutlined />
                    }
                  >
                    {uploadingImg ? "Uploading..." : "Upload New Profile Photo"}
                  </Button>
                </Upload>
              </div>
              <div className="edit-input-box">
                <p>Name</p>
                <input
                  type="text"
                  placeholder="Aniket Raikwar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={name}
                />
              </div>
              <div className="edit-input-box">
                <p>Username</p>
                <input
                  type="text"
                  placeholder="aniket_raikwar"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  defaultValue={userName}
                />
              </div>
              <div className="edit-input-box">
                <p>Bio</p>
                <input
                  type="text"
                  placeholder="I am Never Settle"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  defaultValue={bio}
                />
              </div>
              <div className="edit-input-box">
                <p>Location</p>
                <input
                  type="text"
                  placeholder="Nagpur, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  defaultValue={location}
                />
              </div>
              <div className="edit-input-box">
                <p>Website</p>
                <input
                  type="text"
                  placeholder="https://www.linkedin.com/in/aniketraikwar/"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                  defaultValue={websiteLink}
                />
              </div>
              <div className="flex justify-end items-center mt-10">
                <div onClick={handleCancel} className="logout-cancel">
                  <p>Cancel</p>
                </div>
                <div className="logout-btn" onClick={updateUserProfile}>
                  <p>Save</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        title="Delete"
        open={isDeleteOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col items-center">
          <img src={DiscardImage} alt="" />
          <p className="text-center text-[15px] font-medium">
            Are You Sure, You Want to Delete?
          </p>
          <p className="text-center text-[14px] mt-2">
            Once You Delete, then blog will be Trash Permanently.
          </p>
        </div>
        <div className="flex justify-end mt-12">
          <div onClick={handleCancel} className="logout-cancel">
            <p>Cancel</p>
          </div>
          <div className="logout-btn" onClick={handleDeleteBlog}>
            <p>Delete</p>
          </div>
        </div>
      </Modal>
      <Modal
        title="Sign Out"
        open={isLogoutModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col items-center">
          <img src={LogoutMotion} alt="" />
          <p className="text-center text-[15px] font-medium">
            Are You Sure, You Want to Sign Out?
          </p>
        </div>
        <div className="flex justify-end mt-12">
          <div onClick={handleCancel} className="logout-cancel">
            <p>Cancel</p>
          </div>
          <div onClick={handleLogout} className="logout-btn">
            <p>Sign Out</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfilePage;
