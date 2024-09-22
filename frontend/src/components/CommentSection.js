import React, { useState, useEffect } from "react";
import { Drawer, Input } from "antd";
import moment from "moment";
import { api } from "../services/baseApi";
import { createUserProfileImage } from "../utils/createUserProfile";
import AliceImage from "../images/NoDataFound.png";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const CommentSection = ({
  userData,
  blogId,
  open,
  onClose,
  setCommentCount,
}) => {
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogComments();
  }, []);

  const handleComment = async () => {
    try {
      if (comment.length > 0) {
        setPosting(true);
        const resp = await api.post(`/comment/create/${blogId}`, {
          userId: userData._id,
          description: comment,
        });
        setPosting(false);
        setComment("");
        fetchBlogComments();
      }
    } catch (error) {
      setPosting(false);
      console.log("error: ", error);
    }
  };

  const fetchBlogComments = async () => {
    try {
      setLoading(true);
      const resp = await api.get(`/comment/${blogId}`);
      const data = resp?.data?.data;
      setCommentCount(data?.length);
      setCommentData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    }
  };

  return (
    <Drawer
      title="Comments Section"
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      key="right"
    >
      <div className="flex">
        <div className="new-user-profile-post">
          {userData?.profilePhoto ? (
            <img src={userData?.profilePhoto} alt="" />
          ) : (
            createUserProfileImage(userData?.name)
          )}
        </div>
        <div className="new-user-name-post">
          <p style={{ fontSize: "13px" }} className="user-full-name-post">
            {userData?.name}
          </p>
          <p className="user-name-text-post">@{userData?.username}</p>
        </div>
      </div>
      <TextArea
        className="mt-2"
        rows={4}
        placeholder="What are your thoughts on this blog?"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <div className="w-full flex justify-end mt-3 mb-5">
        <div
          className={comment.length > 0 ? "btn-comment-active" : "btn-comment"}
          onClick={handleComment}
        >
          {posting ? "Posting..." : "Post a Comment"}
        </div>
      </div>
      <hr />

      {loading ? (
        <div className="mt-5">
          <Skeleton avatar paragraph={{ rows: 2 }} active />
          <Skeleton avatar paragraph={{ rows: 2 }} active />
          <Skeleton avatar paragraph={{ rows: 2 }} active />
          <Skeleton avatar paragraph={{ rows: 2 }} active />
        </div>
      ) : (
        <div className="comment-scrollable">
          {commentData.length === 0 ? (
            <div className="h-full w-full bg-[#fff] flex flex-col justify-center items-center rounded-md">
              <img className="w-[70%]" src={AliceImage} alt="" />
              <h3 className="work-head commt">No Comments Available.</h3>
              <h5 className="stay-tuned">You are first to comment.</h5>
              {/* <p className="font-medium text-md">No Comments.</p>
              <p>You are first to comment.</p> */}
            </div>
          ) : (
            <>
              {commentData?.map((comment) => (
                <div className="flex mt-7 mb-10">
                  <Link
                    to={`/wordcraft-users/${comment?.user?._id}`}
                    className="new-user-profile-post"
                  >
                    {comment?.user?.profilePhoto ? (
                      <img src={comment?.user?.profilePhoto} alt="" />
                    ) : (
                      createUserProfileImage(comment?.user?.name)
                    )}
                  </Link>
                  <div style={{ marginTop: "-2px" }} className="pl-3">
                    <Link
                      to={`/wordcraft-users/${comment?.user?._id}`}
                      className="flex items-center"
                    >
                      <p
                        style={{ fontSize: "13px" }}
                        className="user-full-name-post"
                      >
                        {comment?.user?.name}
                      </p>
                      <div className="comment-date">
                        {moment(comment?.createdAt).format("D MMMM, YYYY")}
                      </div>
                    </Link>
                    <p className="w-[270px] break-words">
                      {comment.description}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {commentData.length > 4 && (
        <>
          <hr />
          <div className="see-cmt-text">Scroll Down To See Below Comments</div>
        </>
      )}
    </Drawer>
  );
};

export default CommentSection;
