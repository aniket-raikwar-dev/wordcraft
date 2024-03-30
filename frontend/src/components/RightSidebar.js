import React, { useEffect, useState } from "react";
import FrokestImg from "../images/frokest.jpeg";
import Quote from "./Quote";
import NewUser from "./NewUser";
import { useLocation } from "react-router-dom";
import AsanaUser from "../images/verifiedUserArt.png";

const newUserData = [
  { id: 4, name: "Aniket Raikwar", username: "aniket_raikwar" },
  { id: 5, name: "Smurti Sahoo", username: "s_sahoo_981" },
  { id: 6, name: "Sandi Shiva", username: "shiva_009" },
  { id: 1, name: "Ketan Dabre", username: "ketan_dabre2000" },
  { id: 2, name: "Sagar Wandile", username: "sagar_wandile01" },
  { id: 7, name: "Himanshu S", username: "himanshu_s001" },
  { id: 3, name: "Himanshu S", username: "himanshu_s001" },
  { id: 9, name: "Himanshu S", username: "himanshu_s001" },
];

const RightSidebar = () => {
  const [newUser, setNewUser] = useState(newUserData);

  const location = useLocation();
  const showSidebarImage =
    location.pathname.includes("wordcraft-user") ||
    location.pathname.includes("profile");

  return (
    <div className="rightsidebar-container">
      <div className="frokest-effect">
        <p id="creative-text">#1 Creative Developer</p>
      </div>
      {showSidebarImage ? (
        <div className="instead-user">
          <p>Find the User which You want to Follow.</p>
          <img className="mt-2" src={AsanaUser} alt="" />
          <p>
            Wordcraft allows only the verified user to showing them in
            recommendation.
          </p>
        </div>
      ) : (
        <div className="follower-div">
          <p className="new-foll-text">New Users</p>
          <NewUser newUser={newUser} />
        </div>
      )}
      <Quote />
    </div>
  );
};

export default RightSidebar;
