import React from "react";
import { createUserProfileImage } from "../utils/createUserProfile";
import { Link } from "react-router-dom";

const bannerColor = [
  "#004aec",
  "#18b47b",
  "#496989",
  "#754ad8",
  "#293278",
  "#f62e50",
  "#222831",
  "#06563c",
  "#087c72",
  "#525CEB",
];

const UserBox = ({ user, index }) => {
  return (
    <div key={user?._id} className="user-box">
      <div
        style={{ background: "#000" }}
        className="user-bg-img"
      >
        Think Bold, Do More.
      </div>
      <div className="user-profile-pic">
        {user?.profilePhoto ? (
          <img src={user?.profilePhoto} alt="" />
        ) : (
          <div>{createUserProfileImage(user?.name)}</div>
        )}
      </div>
      <div className="user-info">
        <h3>{user?.name}</h3>
        <div style={{ marginTop: "-2px" }} className="flex items-center">
          <div style={{ width: "13px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(164,164,164,1)"
            >
              <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
            </svg>
          </div>
          <p>Los Angeles, CA, USA</p>
        </div>

        <div className="flex mt-4">
          <div className="verified">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4039A8"
            >
              <path d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"></path>
            </svg>
            <span>Verified User</span>
          </div>
          <div className="verified-blue ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(52,79,233,1)"
            >
              <path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM8 7V9H16V7H8ZM8 11V13H16V11H8ZM8 15V17H13V15H8Z"></path>
            </svg>
            <span>2 Blog Posts</span>
          </div>
        </div>
      </div>
      <Link
        to={`/wordcraft-users/${user?._id}`}
        className="w-full flex justify-center"
      >
        <div className="view-profile">View Profile</div>
      </Link>
    </div>
  );
};

export default UserBox;
