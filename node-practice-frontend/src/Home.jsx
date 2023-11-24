import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./components/card/Card";
import Styles from "./components/card/cardStyles.module.css";
import axios from "axios";
import { toast } from "react-toastify";

export const Home = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  const handleCreate = () => {
    navigate("/create");
  };
  const getCards = async () => {
    try {
      const responseData = await axios.get("http://localhost:3005/getcards");
      if (responseData.length === 0) {
        toast.error("Server Error!");
      } else {
        setCards(responseData?.data?.data);
        toast.success(responseData?.data?.message);
      }
    } catch (error) {
      if (!error.response) {
        console.log("error ", error);
        toast.error(error?.message);
      } else {
        toast.error(error?.response?.data);
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/signin");
    } else {
      getCards();
    }
  }, []);

  const deleteCard = async (id) => {
    try {
      await axios.delete("http://localhost:3005/deletecard", {
        data: {
          ID: id,
        },
      });
      setCards((prev) => {
        return prev.filter((el) => el.id !== id);
      });
    } catch (error) {
      console.log("error ", error);
      toast.error(error.message);
    }
  };

  console.log("response", cards);
  return (
    <>
      <div className={Styles.createButtonContainer}>
        <button onClick={handleCreate} className={Styles.createButton}>
          Create
        </button>
      </div>

      <div className={Styles.container} style={{ margin: "40px 0px" }}>
        {cards?.map((card) => {
          return (
            <Card
              title={card.title}
              description={card.description}
              key={card._id}
              id={card.id}
              deleteCard={deleteCard}
            />
          );
        })}
      </div>
    </>
  );
};
