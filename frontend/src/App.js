import "./App.css";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Bookmark from "./pages/Bookmark";
import Comment from "./pages/Comment";
import CreateNewBlog from "./pages/CreateNewBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyBlogs from "./pages/MyBlogs";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import WordCraftUser from "./pages/WordCarftUser";
import UserDetail from "./pages/UserDetail";
import Feeds from "./pages/Feeds";
import BlogPostDetail from "./pages/BlogPostDetail";
import UserProfilePage from "./pages/UserProfilePage";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<PrivateRoute Component={Layout} />}>
          <Route
            index
            path="/explore"
            element={<PrivateRoute Component={Home} />}
          />
          <Route
            path="/my-blogs"
            element={<PrivateRoute Component={MyBlogs} />}
          />
          <Route
            path="/bookmarks"
            element={<PrivateRoute Component={Bookmark} />}
          />
          <Route
            path="/comments"
            element={<PrivateRoute Component={Comment} />}
          />
          <Route
            path="/wordcraft-users"
            element={<PrivateRoute Component={WordCraftUser} />}
          />
          <Route
            path="/wordcraft-users/:id"
            element={<PrivateRoute Component={UserDetail} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute Component={UserProfilePage} />}
          />

          <Route
            path="/create-new-blog"
            element={<PrivateRoute Component={CreateNewBlog} />}
          />
          <Route
            path="/edit-blog/:id"
            element={<PrivateRoute Component={CreateNewBlog} />}
          />
          <Route path="/search" element={<PrivateRoute Component={SearchResult} />} />
          <Route path="/feeds" element={<PrivateRoute Component={Feeds} />} />
          <Route
            path="/blog/:id"
            element={<PrivateRoute Component={BlogPostDetail} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
