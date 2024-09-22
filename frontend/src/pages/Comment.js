import React from "react";
import AliceImage from "../images/NoDataFound.png";
import WorkUnderProgress from "../images/workUnderProgress.png";

const Comment = () => {
  return (
    <div className="main-content-container ">
      <h2 className="current-page-head">Comments</h2>
      <div className="scrollable-container">
        <div className="h-full w-full bg-[#fff] flex flex-col justify-center items-center rounded-md">
          <img className="w-[50%]" src={WorkUnderProgress} alt="" />
          <h3 className="work-head">Working Under Progress.</h3>
          <h5 className="stay-tuned">STAY TUNED, FOR MORE UPDATES.</h5>
        </div>
      </div>
    </div>
  );
};

export default Comment;
