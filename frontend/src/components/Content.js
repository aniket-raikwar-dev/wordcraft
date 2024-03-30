import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import MyBlogs from "../pages/MyBlogs";
import Bookmark from "../pages/Bookmark";
import Comment from "../pages/Comment";

const Content = () => {
  return (
    <div className="content-container">
      {/* <Switch>
        <Route path="/explore" exact component={Home} />
        <Route path="/my-blogs" exact component={MyBlogs} />
        <Route path="/bookmarks" exact component={Bookmark} />
        <Route path="/comments" exact component={Comment} />
        <Route path="/users" exact component={Follower} />
        <Route path="/profile" exact component={Profile} />
      </Switch> */}
    </div>
  );
};

export default Content;
