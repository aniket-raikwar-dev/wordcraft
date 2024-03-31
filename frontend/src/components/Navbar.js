import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import NotificationImg from "../images/AnimatedIllustration.gif";
import BottomNavbar from "./BottomNavbar";
import { useDispatch } from "react-redux";
import { setSearchTextData } from "../redux/actions/searchTextAction";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchTextData(searchText.toLocaleLowerCase()));
    if (searchText.length >= 3) {
      navigate("/search");
    }
  }, [searchText]);


  const customNotification = (
    <Menu>
      <div className="notification-container">
        <img src={NotificationImg} alt="" />
        <h3>You all Caught Up!</h3>
        <p>No New Notifications.</p>
      </div>
    </Menu>
  );

  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <h3 className="logo-name">WordCraft. (Beta)</h3>
        </div>

        <div className="nav-container">
          <div className="nav-item-div">
            <div className="search-bar-container">
              <div className="search-icon flex-div">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                    fill="rgba(117,117,117,1)"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search blog, post, user..."
                value={searchText}
                name={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div style={{ height: "100%" }} className="flex-div">
              <Dropdown
                overlay={customNotification}
                placement="bottom"
                arrow
              >
                <div className="noti-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20 17H22V19H2V17H4V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V17ZM9 21H15V23H9V21Z"></path>
                  </svg>
                </div>
              </Dropdown>

              <div className="noti-icon mobile">
                <Link to="/create-new-blog">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
                  </svg>
                </Link>
              </div>
              <div className="noti-icon mobile">
                <Link to="/profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
                  </svg>
                </Link>
              </div>

              <Link className="btn-create-new-blog" to="/create-new-blog">
                <p>Create New Blog</p>
              </Link>

              <div className="vertical-line"></div>

              <Link className="btn-profile" to="/profile">
                <p>Go To Pofile</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <BottomNavbar />
    </div>
  );
};

export default Navbar;
