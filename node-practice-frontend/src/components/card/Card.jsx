import Styles from "./cardStyles.module.css";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, id, deleteCard }) => {
  const navigate = useNavigate();

  return (
    <div className={Styles.card}>
      <div className={Styles.cardText}>
        <h1>{title}</h1>
        <p className={Styles.cardPara}>
          {/* {description?.length > 60 ? description?.slice(0, 60) : description} */}
          {description}
        </p>
      </div>
      <div className={Styles.cardButton}>
        <button onClick={() => deleteCard(id)} className={Styles.deleteButton}>
          Delete
        </button>
        <button
          onClick={() =>
            navigate(`/update/${id}`, { state: [title, description, id] })
          }
          className={Styles.viewButton}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Card;
