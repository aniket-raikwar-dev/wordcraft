import React, { useEffect, useState } from "react";
import { api } from "../services/baseApi";
import { Skeleton } from "antd";
import { createUserProfileImage } from "../utils/createUserProfile";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/actions/userDataAction";
import { jwtDecode } from "jwt-decode";
import UserBox from "../components/UserBox";



const WordCraftUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { id } = jwtDecode(token);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/all");
      const users = response.data.data;
      const filterUsers = users.filter((user) => user._id !== id);
      const author = users.filter((user) => user._id == id);
      setUsers(filterUsers);
      dispatch(setUserData(author[0]));
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="main-content-container ">
      <h2 className="current-page-head">Wordcraft User's</h2>

      {loading ? (
        <div className="scrollable-container grid-box">
          <div className="user-box padd">
            <Skeleton avatar paragraph={{ rows: 6 }} active />
          </div>
          <div className="user-box padd">
            <Skeleton avatar paragraph={{ rows: 6 }} active />
          </div>
          <div className="user-box padd">
            <Skeleton avatar paragraph={{ rows: 6 }} active />
          </div>
          <div className="user-box padd">
            <Skeleton avatar paragraph={{ rows: 6 }} active />
          </div>
        </div>
      ) : (
        <div className="scrollable-container grid-box">
          {users.map((user, index) => (
            <UserBox user={user} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WordCraftUser;
