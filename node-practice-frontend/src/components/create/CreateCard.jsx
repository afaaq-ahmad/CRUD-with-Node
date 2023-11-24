import React, { useEffect, useState } from "react";
import Styles from "./createCards.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const CreateCard = () => {
  const { id } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (formData.title.trim() === "" && formData.description.trim() === "") {
      toast.error("Fields are empty!");
    } else if (formData.title.trim() === "") {
      toast.error("Title is missing!");
    } else if (formData.description.trim() === "") {
      toast.error("Description is missing!");
    } else {
      if (!!id) {
        updateData();
      } else {
        postData();
      }
    }
  };

  const postData = async () => {
    try {
      await axios.post("http://localhost:3005/addcard", formData);
      navigate("/home");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const updateData = async () => {
    try {
      await axios.put(`http://localhost:3005/updatecard`, formData);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!!id) {
      setTitle("Update ");
      if (location?.state !== null) {
        setFormData(() => {
          return {
            title: location?.state[0],
            description: location?.state[1],
            id: location?.state[2],
          };
        });
      }
    } else {
      setTitle("Create ");
    }
  }, []);

  return (
    <>
      <div className={Styles.createCardContainer}>
        <div>
          <h1>{title} Card</h1>
        </div>
        <div className={Styles.inputContainer}>
          <input
            type="text"
            className={Styles.inputs}
            placeholder="Enter Title"
            name="title"
            value={formData?.title}
            onChange={handleChange}
          />
        </div>
        <div className={Styles.inputContainer}>
          <textarea
            className={Styles.description}
            name="description"
            id=""
            cols="30"
            rows="10"
            placeholder="Enter Description"
            value={formData?.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button onClick={handleSubmit} className={Styles.addButton}>
            {title}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateCard;
