import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { userIsLogin } from "../redux/actions/userAuthAction";
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

  const handleLogout = () => {
    dispatch(userIsLogin(false));
    localStorage.clear();
    navigate("/login");
  };

  const settingDropdown = (
    <Menu className="profile-items">
      <Link to="/profile" className="list-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
        </svg>
        <p>Profile</p>
      </Link>
      <div onClick={handleLogout} className="list-item mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path>
        </svg>
        <p>Logout</p>
      </div>
    </Menu>
  );

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
              <Dropdown overlay={customNotification} placement="bottom" arrow>
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
                <Dropdown
                  overlay={settingDropdown}
                  placement="bottomRight"
                  // trigger={["hover"]}
                  arrow
                >
                  <div style={{ width: "22px", cursor: "pointer", marginLeft: "3px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8.68637 4.00008L11.293 1.39348C11.6835 1.00295 12.3167 1.00295 12.7072 1.39348L15.3138 4.00008H19.0001C19.5524 4.00008 20.0001 4.4478 20.0001 5.00008V8.68637L22.6067 11.293C22.9972 11.6835 22.9972 12.3167 22.6067 12.7072L20.0001 15.3138V19.0001C20.0001 19.5524 19.5524 20.0001 19.0001 20.0001H15.3138L12.7072 22.6067C12.3167 22.9972 11.6835 22.9972 11.293 22.6067L8.68637 20.0001H5.00008C4.4478 20.0001 4.00008 19.5524 4.00008 19.0001V15.3138L1.39348 12.7072C1.00295 12.3167 1.00295 11.6835 1.39348 11.293L4.00008 8.68637V5.00008C4.00008 4.4478 4.4478 4.00008 5.00008 4.00008H8.68637ZM12.0001 15.0001C13.6569 15.0001 15.0001 13.6569 15.0001 12.0001C15.0001 10.3432 13.6569 9.00008 12.0001 9.00008C10.3432 9.00008 9.00008 10.3432 9.00008 12.0001C9.00008 13.6569 10.3432 15.0001 12.0001 15.0001Z"></path>
                    </svg>
                  </div>
                </Dropdown>
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
