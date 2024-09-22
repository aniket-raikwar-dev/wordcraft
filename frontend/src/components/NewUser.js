import React, { useState, useEffect } from "react";
import { api } from "../services/baseApi";
import { Skeleton } from "antd";
import { createUserProfileImage } from "../utils/createUserProfile";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const NewUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { id } = jwtDecode(token);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/all");
      const users = response.data.data;
      const author = users.find((user) => user._id === id);
      const filterUsers = users.filter((user) => user._id !== id);

      const updatedUsers = filterUsers.map((user) => {
        if (author.following.includes(user._id)) {
          user.isFollowed = true;
        } else user.isFollowed = false;
        return user;
      });
      setAllUsers(updatedUsers);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleFollowed = async (userId) => {
    try {
      const updatedUsers = allUsers.map((user) => ({
        ...user,
        isFollowed: userId === user._id ? !user.isFollowed : user.isFollowed,
      }));
      setAllUsers(updatedUsers);
      await api.get(`users/following/${userId}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="all-user-container">
      {loading ? (
        <>
          <Skeleton avatar paragraph={{ rows: 2 }} active />
          <Skeleton avatar paragraph={{ rows: 2 }} active />
          <Skeleton avatar paragraph={{ rows: 2 }} active />
        </>
      ) : (
        allUsers.map((user) => (
          <div key={user?._id} className="new-user-item">
            <Link
              to={`/wordcraft-users/${user?._id}`}
              className="flex items-center"
            >
              <div className="new-user-profile">
                {user?.profilePhoto ? (
                  <img src={user?.profilePhoto} alt="" />
                ) : (
                  createUserProfileImage(user.name)
                )}
              </div>
              <div className="new-user-name">
                <div className="flex">
                  <p className="user-full-name">{user?.name}</p>
                </div>
                <p className="user-name-text">@{user?.username}</p>
              </div>
            </Link>
            <div
              className={user?.isFollowed ? "btn-following" : "btn-follow"}
              onClick={() => handleFollowed(user?._id)}
            >
              {user?.isFollowed ? "Following" : "Follow"}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NewUser;
