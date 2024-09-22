import React from "react";
import Quote from "./Quote";
import NewUser from "./NewUser";
import { useLocation } from "react-router-dom";
import AsanaUser from "../images/verifiedUserArt.png";

const RightSidebar = () => {
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
          <NewUser />
        </div>
      )}
      <Quote />
    </div>
  );
};

export default RightSidebar;
