import React, { useEffect, useState } from "react";
import {
  UploadOutlined,
  LoadingOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Button, Upload, Select, Modal, message } from "antd";
import { api } from "../services/baseApi";
import { useNavigate, useLocation } from "react-router-dom";
import DiscardImage from "../images/discardImg.png";
import ReactQuill from "react-quill";
import { Grid } from "react-loader-spinner";
import "react-quill/dist/quill.snow.css";

const tagOptions = [
  { value: "React", label: "React" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "HTML", label: "HTML" },
  { value: "Next JS", label: "Next JS" },
  { value: "DOM", label: "DOM" },
  { value: "Node JS", label: "Node JS" },
  { value: "Database", label: "Database" },
  { value: "API", label: "API" },
  { value: "Web Dev", label: "Web Dev" },
  { value: "Google", label: "Google" },
  { value: "Microsoft", label: "Microsoft" },
  { value: "IBM", label: "IBM" },
  { value: "Meta", label: "Meta" },
  { value: "Data Science", label: "Data Science" },
  { value: "MERN", label: "MERN" },
  { value: "Interview", label: "Interview" },
];

const CreateNewBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isEditForm, setIsEditForm] = useState(false);
  const [blogId, setBlogId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleImageFile = (file) => {
    setUploadingImg(true);
    setTimeout(() => {
      setImageFile(file);
      setUploadingImg(false);
    }, 1000);
  };

  const handleSelectTags = (value) => {
    const selectedValues = value.slice(0, 3);
    setSelectedTags(selectedValues);
  };

  const fetchEditBlogDetail = async (blogId) => {
    try {
      const resp = await api.get(`/post/detail/${blogId}`);
      const blog = resp?.data?.data;
      setTitle(blog?.title);
      setSelectedTags(blog?.tags);
      setContent(blog?.description);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    const path = location?.pathname?.split("/");
    const pathName = path[1];
    if (pathName === "edit-blog") {
      const blogId = path[2];
      setBlogId(blogId);
      setIsEditForm(true);
      fetchEditBlogDetail(blogId);
    }
  }, []);

  useEffect(() => {
    autosize();
    function autosize() {
      const textareas = document.querySelectorAll(".autosize");

      textareas.forEach((textarea) => {
        textarea.setAttribute("rows", 1);
        resize(textarea);
      });

      textareas.forEach((textarea) => {
        textarea.addEventListener("input", () => resize(textarea));
      });

      function resize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    }
  }, []);

  const publishBlogPost = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.set("title", title);
      formData.set("description", content);
      formData.set("tags", selectedTags);

      if (imageFile) {
        formData.set("image", imageFile);
      }

      const token = localStorage.getItem("token");

      if (isEditForm) {
        await api.put(`post/update/${blogId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api.post("/post/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      successMessageToast();
      setTitle("");
      setContent("");
      setImageFile(null);
      setSelectedTags([]);
      setLoading(false);
    } catch (error) {
      let errMessage = error.response.data.message;
      errorMessageToast(errMessage);
      setLoading(false);
    }
  };

  const discardPost = () => {
    setTitle("");
    setContent("");
    setImageFile([]);
    setSelectedTags([]);
    navigate("/explore");
  };

  const successMessageToast = () => {
    messageApi.open({
      content: "Your Blog has been Published.",
      icon: (
        <CheckCircleFilled
          style={{ color: "#3d2df0", marginBottom: "4px", marginRight: "10px" }}
        />
      ),
      style: {
        marginTop: "10vh",
      },
    });
  };

  const errorMessageToast = (errMessage) => {
    messageApi.open({
      content: errMessage,
      icon: (
        <CloseCircleFilled
          style={{ color: "#f74b29", marginBottom: "4px", marginRight: "10px" }}
        />
      ),
      style: {
        marginTop: "10vh",
      },
    });
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
    },
  };

  const editorStyle = {
    height: "400px",
  };

  return (
    <div className="main-content-container ">
      {contextHolder}
      <div className="scrollable-container create-blog-box">
        {loading ? (
          <div className="flex justify-center flex-col items-center h-[500px]">
            <Grid
              visible={true}
              height="80"
              width="80"
              color="#3d2df0"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
            />
            <h2 className="mt-12 font-medium text-xl">
              Publishing Your Blog, It takes some times.
            </h2>
            <p className="mt-1 font-normal text-sm text-[#2d40f0]">
              Being Creative is Awesome.
            </p>
          </div>
        ) : (
          <div>
            <Upload
              beforeUpload={() => false}
              onChange={(info) => handleImageFile(info.file)}
            >
              <Button
                icon={uploadingImg ? <LoadingOutlined /> : <UploadOutlined />}
              >
                {uploadingImg ? "Uploading..." : "Upload Cover Image"}
              </Button>
            </Upload>

            <textarea
              className="blog-title-head autosize mt-3"
              placeholder="New blog title here..."
              autoComplete="off"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>

            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
                height: "38px",
              }}
              placeholder="Please Select Maximum 3 Tags"
              onChange={handleSelectTags}
              options={tagOptions}
              value={selectedTags}
              maxTagCount={3}
            />

            <div className="mt-4">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                style={editorStyle}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-4">
        <button
          className="btn-profile btn-discard"
          disabled={loading}
          onClick={showModal}
        >
          Discard
        </button>
        <button
          className="btn-profile btn-save"
          disabled={loading}
          onClick={publishBlogPost}
        >
          Publish
        </button>
      </div>

      <Modal
        title="Discard Post"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col items-center">
          <img src={DiscardImage} alt="" />
          <p className="text-center text-[15px] font-medium">
            Are You Sure, You Want to Discard?
          </p>
          <p className="text-center text-[14px] mt-2">
            Once You Discard, then content will be Deleted Permanently.
          </p>
        </div>
        <div className="flex justify-end mt-12">
          <div onClick={handleOk} className="logout-cancel">
            <p>Cancel</p>
          </div>
          <div onClick={discardPost} className="logout-btn">
            <p>Discard</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewBlog;
